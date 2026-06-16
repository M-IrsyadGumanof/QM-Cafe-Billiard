<?php

namespace Tests\Feature;

use App\Models\BilliardPackage;
use App\Models\BilliardTable;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class CustomerReservationTest extends TestCase
{
    use RefreshDatabase;

    private User $customer;
    private BilliardTable $availableTable;
    private BilliardTable $occupiedTable;
    private BilliardTable $maintenanceTable;
    private BilliardPackage $regularPackage;
    private BilliardPackage $personalPackage;

    protected function setUp(): void
    {
        parent::setUp();

        $this->customer = User::factory()->create(['role' => 'customer']);

        $this->availableTable = BilliardTable::create([
            'table_number' => 'T01',
            'name' => 'Meja VIP 1',
            'status' => 'available',
        ]);

        $this->occupiedTable = BilliardTable::create([
            'table_number' => 'T02',
            'name' => 'Meja VIP 2',
            'status' => 'occupied',
        ]);

        $this->maintenanceTable = BilliardTable::create([
            'table_number' => 'T03',
            'name' => 'Meja VIP 3',
            'status' => 'maintenance',
        ]);

        $this->regularPackage = BilliardPackage::create([
            'name' => 'Paket Regular 2 Jam',
            'type' => 'regular',
            'duration_minutes' => 120,
            'price' => 50000,
            'status' => 'active',
        ]);

        $this->personalPackage = BilliardPackage::create([
            'name' => 'Paket Personal',
            'type' => 'personal',
            'price' => 25000,
            'status' => 'active',
        ]);
    }

    public function test_customer_can_view_their_reservations(): void
    {
        $response = $this->actingAs($this->customer)
            ->get(route('customer.reservations.index'));

        $response->assertOk();
    }

    public function test_customer_can_view_reservation_create_page(): void
    {
        $response = $this->actingAs($this->customer)
            ->get(route('customer.reservations.create'));

        $response->assertOk();
    }

    public function test_customer_can_create_regular_reservation_successfully(): void
    {
        $reservationDate = Carbon::today()->addDay()->format('Y-m-d');
        $startTime = '14:00';

        $response = $this->actingAs($this->customer)
            ->post(route('customer.reservations.store'), [
                'billiard_table_id' => $this->availableTable->id,
                'billiard_package_id' => $this->regularPackage->id,
                'reservation_date' => $reservationDate,
                'start_time' => $startTime,
                'notes' => 'Testing regular booking',
            ]);

        $this->assertDatabaseHas('reservations', [
            'user_id' => $this->customer->id,
            'billiard_table_id' => $this->availableTable->id,
            'billiard_package_id' => $this->regularPackage->id,
            'package_type' => 'regular',
            'reservation_date' => $reservationDate,
            'start_time' => $startTime,
            'duration_minutes' => 120,
            'total_price' => 50000,
            'booking_status' => 'pending',
            'payment_status' => 'unpaid',
        ]);

        $reservation = Reservation::first();
        $response->assertRedirect(route('customer.reservations.show', $reservation));

        $this->assertDatabaseHas('qm_notifications', [
            'target_role' => 'admin',
            'type' => 'reservation',
        ]);
    }

    public function test_customer_can_create_personal_reservation_successfully(): void
    {
        $reservationDate = Carbon::today()->addDay()->format('Y-m-d');
        $startTime = '16:00';

        $response = $this->actingAs($this->customer)
            ->post(route('customer.reservations.store'), [
                'billiard_table_id' => $this->availableTable->id,
                'billiard_package_id' => $this->personalPackage->id,
                'reservation_date' => $reservationDate,
                'start_time' => $startTime,
                'duration_minutes' => 90,
                'notes' => 'Testing personal booking',
            ]);

        $this->assertDatabaseHas('reservations', [
            'user_id' => $this->customer->id,
            'billiard_table_id' => $this->availableTable->id,
            'billiard_package_id' => $this->personalPackage->id,
            'package_type' => 'personal',
            'reservation_date' => $reservationDate,
            'start_time' => $startTime,
            'duration_minutes' => 90,
            'total_price' => 0,
            'booking_status' => 'pending',
            'payment_status' => 'paid_after_play',
        ]);
    }

    public function test_customer_cannot_reserve_occupied_or_maintenance_table(): void
    {
        $reservationDate = Carbon::today()->addDay()->format('Y-m-d');

        // Occupied table
        $responseOccupied = $this->actingAs($this->customer)
            ->post(route('customer.reservations.store'), [
                'billiard_table_id' => $this->occupiedTable->id,
                'billiard_package_id' => $this->regularPackage->id,
                'reservation_date' => $reservationDate,
                'start_time' => '12:00',
            ]);
        $responseOccupied->assertStatus(422);

        // Maintenance table
        $responseMaintenance = $this->actingAs($this->customer)
            ->post(route('customer.reservations.store'), [
                'billiard_table_id' => $this->maintenanceTable->id,
                'billiard_package_id' => $this->regularPackage->id,
                'reservation_date' => $reservationDate,
                'start_time' => '12:00',
            ]);
        $responseMaintenance->assertStatus(422);
    }

    public function test_customer_cannot_reserve_due_to_schedule_conflict(): void
    {
        $reservationDate = Carbon::today()->addDay()->format('Y-m-d');
        $startTime = '10:00';

        // Pre-create a reservation
        Reservation::create([
            'user_id' => $this->customer->id,
            'billiard_table_id' => $this->availableTable->id,
            'billiard_package_id' => $this->regularPackage->id,
            'reservation_code' => 'RSV-TEMP-1',
            'package_type' => 'regular',
            'reservation_date' => $reservationDate,
            'start_time' => $startTime,
            'end_time' => '12:00',
            'duration_minutes' => 120,
            'total_price' => 50000,
            'booking_status' => 'confirmed',
            'payment_status' => 'unpaid',
        ]);

        // Try to book at the exact same slot
        $responseConflict = $this->actingAs($this->customer)
            ->post(route('customer.reservations.store'), [
                'billiard_table_id' => $this->availableTable->id,
                'billiard_package_id' => $this->regularPackage->id,
                'reservation_date' => $reservationDate,
                'start_time' => '10:30', // overlaps with 10:00 - 12:00
            ]);

        $responseConflict->assertStatus(422);
    }

    public function test_customer_can_view_their_own_reservation_details(): void
    {
        $reservation = Reservation::create([
            'user_id' => $this->customer->id,
            'billiard_table_id' => $this->availableTable->id,
            'billiard_package_id' => $this->regularPackage->id,
            'reservation_code' => 'RSV-TEST-OWN',
            'package_type' => 'regular',
            'reservation_date' => Carbon::today()->format('Y-m-d'),
            'start_time' => '14:00',
            'end_time' => '16:00',
            'duration_minutes' => 120,
            'total_price' => 50000,
            'booking_status' => 'pending',
            'payment_status' => 'unpaid',
        ]);

        $response = $this->actingAs($this->customer)
            ->get(route('customer.reservations.show', $reservation));

        $response->assertOk();
    }

    public function test_customer_cannot_view_others_reservation_details(): void
    {
        $otherUser = User::factory()->create(['role' => 'customer']);

        $reservation = Reservation::create([
            'user_id' => $otherUser->id,
            'billiard_table_id' => $this->availableTable->id,
            'billiard_package_id' => $this->regularPackage->id,
            'reservation_code' => 'RSV-TEST-OTHER',
            'package_type' => 'regular',
            'reservation_date' => Carbon::today()->format('Y-m-d'),
            'start_time' => '14:00',
            'end_time' => '16:00',
            'duration_minutes' => 120,
            'total_price' => 50000,
            'booking_status' => 'pending',
            'payment_status' => 'unpaid',
        ]);

        $response = $this->actingAs($this->customer)
            ->get(route('customer.reservations.show', $reservation));

        $response->assertStatus(403);
    }
}
