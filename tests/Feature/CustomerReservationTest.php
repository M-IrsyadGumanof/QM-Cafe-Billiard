<?php

namespace Tests\Feature;

use App\Models\BilliardPackage;
use App\Models\BilliardTable;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_create_reservation(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        $table = BilliardTable::factory()->create(['status' => 'available']);
        $package = BilliardPackage::factory()->create([
            'type' => 'regular',
            'duration_minutes' => 60,
            'price' => 40000,
        ]);

        $response = $this->actingAs($customer)->post('/customer/reservations', [
            'billiard_table_id' => $table->id,
            'billiard_package_id' => $package->id,
            'reservation_date' => now()->addDay()->toDateString(),
            'start_time' => '14:00',
            'notes' => 'Test reservation',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('reservations', [
            'user_id' => $customer->id,
            'billiard_table_id' => $table->id,
            'booking_status' => 'pending',
        ]);
        $this->assertDatabaseHas('qm_notifications', ['type' => 'reservation']);
    }

    public function test_customer_can_view_reservation_list(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        Reservation::factory()->create(['user_id' => $customer->id]);

        $this->actingAs($customer)
            ->get('/customer/reservations')
            ->assertOk();
    }

    public function test_customer_can_view_own_reservation_detail(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        $reservation = Reservation::factory()->create(['user_id' => $customer->id]);

        $this->actingAs($customer)
            ->get("/customer/reservations/{$reservation->id}")
            ->assertOk();
    }

    public function test_customer_cannot_view_other_reservation(): void
    {
        $customer1 = User::factory()->create(['role' => 'customer']);
        $customer2 = User::factory()->create(['role' => 'customer']);
        $reservation = Reservation::factory()->create(['user_id' => $customer1->id]);

        $this->actingAs($customer2)
            ->get("/customer/reservations/{$reservation->id}")
            ->assertForbidden();
    }

    public function test_reservation_rejects_occupied_table(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        $table = BilliardTable::factory()->create(['status' => 'occupied']);
        $package = BilliardPackage::factory()->create();

        $this->actingAs($customer)->post('/customer/reservations', [
            'billiard_table_id' => $table->id,
            'billiard_package_id' => $package->id,
            'reservation_date' => now()->addDay()->toDateString(),
            'start_time' => '14:00',
        ])->assertStatus(422);
    }
}
