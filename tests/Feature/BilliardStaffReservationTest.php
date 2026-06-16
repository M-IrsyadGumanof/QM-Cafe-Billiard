<?php

namespace Tests\Feature;

use App\Models\BilliardTable;
use App\Models\BilliardPackage;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class BilliardStaffReservationTest extends TestCase
{
    use RefreshDatabase;

    private User $billiardStaff;
    private User $customer;
    private BilliardTable $table;
    private BilliardPackage $package;
    private Reservation $reservation;

    protected function setUp(): void
    {
        parent::setUp();

        $this->billiardStaff = User::factory()->create(['role' => 'billiard_staff']);
        $this->customer = User::factory()->create(['role' => 'customer']);

        $this->table = BilliardTable::create([
            'table_number' => 'T01',
            'name' => 'Meja Utama 1',
            'status' => 'available',
        ]);

        $this->package = BilliardPackage::create([
            'name' => 'Paket Regular 2 Jam',
            'type' => 'regular',
            'duration_minutes' => 120,
            'price' => 50000,
            'status' => 'active',
        ]);

        $this->reservation = Reservation::create([
            'user_id' => $this->customer->id,
            'billiard_table_id' => $this->table->id,
            'billiard_package_id' => $this->package->id,
            'reservation_code' => 'RSV-STAFF-TEST',
            'package_type' => 'regular',
            'reservation_date' => Carbon::today()->format('Y-m-d'),
            'start_time' => '14:00',
            'end_time' => '16:00',
            'duration_minutes' => 120,
            'total_price' => 50000,
            'booking_status' => 'pending',
            'payment_status' => 'unpaid',
        ]);
    }

    public function test_non_staff_cannot_access_billiard_dashboard(): void
    {
        $response = $this->actingAs($this->customer)
            ->get(route('billiard.dashboard'));

        $response->assertStatus(403);
    }

    public function test_billiard_staff_can_access_dashboard_with_stats(): void
    {
        $response = $this->actingAs($this->billiardStaff)
            ->get(route('billiard.dashboard'));

        $response->assertOk();
    }

    public function test_billiard_staff_can_view_reservations(): void
    {
        $response = $this->actingAs($this->billiardStaff)
            ->get(route('billiard.reservations.index'));

        $response->assertOk();
    }

    public function test_billiard_staff_can_view_reservation_detail(): void
    {
        $response = $this->actingAs($this->billiardStaff)
            ->get(route('billiard.reservations.show', $this->reservation));

        $response->assertOk();
    }

    public function test_billiard_staff_can_update_reservation_status(): void
    {
        $response = $this->actingAs($this->billiardStaff)
            ->patch(route('billiard.reservations.status', $this->reservation), [
                'booking_status' => 'confirmed',
            ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('reservations', [
            'id' => $this->reservation->id,
            'booking_status' => 'confirmed',
        ]);
    }

    public function test_billiard_staff_cannot_update_reservation_with_invalid_status(): void
    {
        $response = $this->actingAs($this->billiardStaff)
            ->patch(route('billiard.reservations.status', $this->reservation), [
                'booking_status' => 'invalid_status_value',
            ]);

        $response->assertSessionHasErrors('booking_status');
    }

    public function test_billiard_staff_can_view_table_schedule(): void
    {
        $response = $this->actingAs($this->billiardStaff)
            ->get(route('billiard.table-schedule.index'));

        $response->assertOk();
    }

    public function test_billiard_staff_can_view_sessions(): void
    {
        // Change booking status to playing to show up in sessions
        $this->reservation->update(['booking_status' => 'playing']);

        $response = $this->actingAs($this->billiardStaff)
            ->get(route('billiard.sessions.index'));

        $response->assertOk();
    }

    public function test_billiard_staff_can_view_personal_billing(): void
    {
        $response = $this->actingAs($this->billiardStaff)
            ->get(route('billiard.personal-billing.show', $this->reservation));

        $response->assertOk();
    }
}
