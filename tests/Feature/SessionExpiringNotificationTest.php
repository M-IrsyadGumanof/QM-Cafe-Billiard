<?php

namespace Tests\Feature;

use App\Models\BilliardPackage;
use App\Models\BilliardTable;
use App\Models\Reservation;
use App\Models\User;
use App\Events\SessionExpiringEvent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class SessionExpiringNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_command_does_not_dispatch_event_if_remaining_time_is_above_5_minutes(): void
    {
        Event::fake();
        $this->travelTo(now()->startOfSecond());

        $customer = User::factory()->create(['role' => 'customer']);
        $table = BilliardTable::factory()->create();
        $package = BilliardPackage::factory()->create();

        // 30 minutes remaining
        Reservation::factory()->create([
            'user_id' => $customer->id,
            'billiard_table_id' => $table->id,
            'billiard_package_id' => $package->id,
            'booking_status' => 'playing',
            'actual_start_time' => now()->subMinutes(30),
            'duration_minutes' => 60,
        ]);

        $this->artisan('billiard:check-expiring-sessions')
            ->expectsOutput('Checked 0 expiring sessions.')
            ->assertExitCode(0);

        Event::assertNotDispatched(SessionExpiringEvent::class);
        $this->assertDatabaseMissing('qm_notifications', [
            'type' => 'session_expiring',
        ]);
    }

    public function test_command_dispatches_event_and_stores_notification_when_remaining_time_is_between_4_and_5_minutes(): void
    {
        Event::fake();
        $this->travelTo(now()->startOfSecond());

        $customer = User::factory()->create(['role' => 'customer']);
        $table = BilliardTable::factory()->create(['name' => 'Meja VIP 1']);
        $package = BilliardPackage::factory()->create();

        // 5 minutes remaining (duration 60, actual_start_time is 55 minutes ago)
        $reservation = Reservation::factory()->create([
            'user_id' => $customer->id,
            'billiard_table_id' => $table->id,
            'billiard_package_id' => $package->id,
            'booking_status' => 'playing',
            'actual_start_time' => now()->subMinutes(55),
            'duration_minutes' => 60,
        ]);

        $this->artisan('billiard:check-expiring-sessions')
            ->expectsOutput('Checked 1 expiring sessions.')
            ->assertExitCode(0);

        Event::assertDispatched(SessionExpiringEvent::class, function ($event) use ($reservation) {
            return $event->reservation->id === $reservation->id && $event->remainingMinutes === 5;
        });

        $this->assertDatabaseHas('qm_notifications', [
            'user_id' => $customer->id,
            'target_role' => 'customer',
            'title' => 'Waktu Bermain Hampir Habis!',
            'message' => 'Sisa waktu bermain di Meja VIP 1: 5 menit',
            'type' => 'session_expiring',
        ]);
    }

    public function test_command_does_not_send_duplicate_notifications_within_10_minutes(): void
    {
        Event::fake();
        $this->travelTo(now()->startOfSecond());

        $customer = User::factory()->create(['role' => 'customer']);
        $table = BilliardTable::factory()->create();
        $package = BilliardPackage::factory()->create();

        $reservation = Reservation::factory()->create([
            'user_id' => $customer->id,
            'billiard_table_id' => $table->id,
            'billiard_package_id' => $package->id,
            'booking_status' => 'playing',
            'actual_start_time' => now()->subMinutes(55),
            'duration_minutes' => 60,
        ]);

        // Run once
        $this->artisan('billiard:check-expiring-sessions')
            ->expectsOutput('Checked 1 expiring sessions.')
            ->assertExitCode(0);

        Event::assertDispatched(SessionExpiringEvent::class, 1);

        // Run again immediately (should hit cache and skip sending/inserting)
        $this->artisan('billiard:check-expiring-sessions')
            ->expectsOutput('Checked 1 expiring sessions.')
            ->assertExitCode(0);

        // Assert event was only dispatched once total
        Event::assertDispatched(SessionExpiringEvent::class, 1);
        
        // Assert there is only one qm_notifications entry
        $this->assertEquals(1, \App\Models\QmNotification::where('user_id', $customer->id)->where('type', 'session_expiring')->count());
    }

    public function test_command_dispatches_event_and_stores_notification_when_session_expires(): void
    {
        Event::fake();
        $this->travelTo(now()->startOfSecond());

        $customer = User::factory()->create(['role' => 'customer']);
        $table = BilliardTable::factory()->create(['name' => 'Meja VIP 1']);
        $package = BilliardPackage::factory()->create();

        // Expired session (duration 60, actual_start_time is 65 minutes ago, so remaining_minutes <= 0)
        $reservation = Reservation::factory()->create([
            'user_id' => $customer->id,
            'billiard_table_id' => $table->id,
            'billiard_package_id' => $package->id,
            'booking_status' => 'playing',
            'actual_start_time' => now()->subMinutes(65),
            'duration_minutes' => 60,
        ]);

        $this->artisan('billiard:check-expiring-sessions')
            ->assertExitCode(0);

        Event::assertDispatched(\App\Events\SessionExpiredEvent::class, function ($event) use ($reservation) {
            return $event->reservation->id === $reservation->id;
        });

        $this->assertDatabaseHas('qm_notifications', [
            'user_id' => $customer->id,
            'target_role' => 'customer',
            'title' => 'Waktu Bermain Habis!',
            'type' => 'session_expired',
        ]);

        $this->assertDatabaseHas('qm_notifications', [
            'target_role' => 'admin',
            'title' => 'Sesi Bermain Habis!',
            'type' => 'session_expired',
        ]);

        $this->assertDatabaseHas('qm_notifications', [
            'target_role' => 'billiard_staff',
            'title' => 'Sesi Bermain Habis!',
            'type' => 'session_expired',
        ]);
    }
}
