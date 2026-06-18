<?php

namespace Tests\Feature;

use App\Models\BilliardTable;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class SessionExpiringNotificationTest extends TestCase
{
    use RefreshDatabase;

    private User $customer;
    private BilliardTable $table;

    protected function setUp(): void
    {
        parent::setUp();

        $this->customer = User::factory()->create(['role' => 'customer']);
        $this->table = BilliardTable::create([
            'table_number' => 'T01',
            'name' => 'Meja VIP 1',
            'status' => 'playing',
        ]);
    }

    public function test_command_dispatches_event_for_session_expiring_in_5_minutes(): void
    {
        Event::fake();

        // Reservasi aktif yang akan habis 5 menit lagi
        $reservation = Reservation::create([
            'user_id' => $this->customer->id,
            'billiard_table_id' => $this->table->id,
            'billiard_package_id' => 1, // Asumsi default package
            'reservation_code' => 'RSV-EXP-001',
            'package_type' => 'regular',
            'reservation_date' => Carbon::today()->format('Y-m-d'),
            'start_time' => Carbon::now()->subMinutes(115)->format('H:i'), // Dimulai 115 menit lalu
            'duration_minutes' => 120, // Durasi 120 menit (Sisa 5 menit)
            'booking_status' => 'playing',
            'actual_start_time' => Carbon::now()->subMinutes(115),
            'payment_status' => 'paid',
        ]);

        $this->artisan('billiard:check-expiring-sessions')->assertSuccessful();

        Event::assertDispatched('App\Events\SessionExpiringEvent', function ($event) use ($reservation) {
            return $event->reservation->id === $reservation->id;
        });

        $this->assertDatabaseHas('qm_notifications', [
            'user_id' => $this->customer->id,
            'type' => 'session_expiring',
        ]);
    }

    public function test_command_does_not_dispatch_event_for_session_expiring_in_30_minutes(): void
    {
        Event::fake();

        // Reservasi aktif yang akan habis 30 menit lagi
        $reservation = Reservation::create([
            'user_id' => $this->customer->id,
            'billiard_table_id' => $this->table->id,
            'billiard_package_id' => 1,
            'reservation_code' => 'RSV-EXP-002',
            'package_type' => 'regular',
            'reservation_date' => Carbon::today()->format('Y-m-d'),
            'start_time' => Carbon::now()->subMinutes(90)->format('H:i'),
            'duration_minutes' => 120, // Sisa 30 menit
            'booking_status' => 'playing',
            'actual_start_time' => Carbon::now()->subMinutes(90),
            'payment_status' => 'paid',
        ]);

        $this->artisan('billiard:check-expiring-sessions')->assertSuccessful();

        Event::assertNotDispatched('App\Events\SessionExpiringEvent');
        
        $this->assertDatabaseMissing('qm_notifications', [
            'user_id' => $this->customer->id,
            'type' => 'session_expiring',
        ]);
    }

    public function test_command_does_not_dispatch_duplicate_event_if_already_notified(): void
    {
        Event::fake();

        $reservation = Reservation::create([
            'user_id' => $this->customer->id,
            'billiard_table_id' => $this->table->id,
            'billiard_package_id' => 1,
            'reservation_code' => 'RSV-EXP-003',
            'package_type' => 'regular',
            'reservation_date' => Carbon::today()->format('Y-m-d'),
            'start_time' => Carbon::now()->subMinutes(115)->format('H:i'),
            'duration_minutes' => 120,
            'booking_status' => 'playing',
            'actual_start_time' => Carbon::now()->subMinutes(115),
            'payment_status' => 'paid',
        ]);

        // Simulasikan cache bahwa notifikasi sudah dikirim
        $cacheKey = "session_expiring_notified:{$reservation->id}";
        Cache::put($cacheKey, true, now()->addMinutes(10));

        $this->artisan('billiard:check-expiring-sessions')->assertSuccessful();

        Event::assertNotDispatched('App\Events\SessionExpiringEvent');
    }

    public function test_customer_can_only_authenticate_own_private_channel(): void
    {
        // Tes otorisasi channel (Mensyaratkan Route::post('/broadcasting/auth'))
        $response = $this->actingAs($this->customer)
            ->post('/broadcasting/auth', [
                'channel_name' => 'private-customer.' . $this->customer->id,
                'socket_id' => '12345.67890'
            ]);

        $response->assertStatus(200);

        // Tes customer lain tidak bisa listen channel ini
        $otherCustomer = User::factory()->create(['role' => 'customer']);
        $responseForbidden = $this->actingAs($otherCustomer)
            ->post('/broadcasting/auth', [
                'channel_name' => 'private-customer.' . $this->customer->id,
                'socket_id' => '12345.67890'
            ]);

        $responseForbidden->assertStatus(403);
    }
}
