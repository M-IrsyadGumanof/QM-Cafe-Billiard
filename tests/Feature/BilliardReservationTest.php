<?php

namespace Tests\Feature;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BilliardReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_billiard_staff_can_view_reservations(): void
    {
        $staff = User::factory()->create(['role' => 'billiard_staff']);

        $this->actingAs($staff)->get('/billiard/reservations')->assertOk();
    }

    public function test_billiard_staff_can_view_reservation_detail(): void
    {
        $staff = User::factory()->create(['role' => 'billiard_staff']);
        $reservation = Reservation::factory()->create();

        $this->actingAs($staff)->get("/billiard/reservations/{$reservation->id}")->assertOk();
    }

    public function test_billiard_staff_can_update_reservation_status(): void
    {
        $staff = User::factory()->create(['role' => 'billiard_staff']);
        $reservation = Reservation::factory()->create(['booking_status' => 'confirmed']);

        $this->actingAs($staff)
            ->patch("/billiard/reservations/{$reservation->id}/status", ['booking_status' => 'playing'])
            ->assertRedirect();

        $reservation->refresh();
        $this->assertSame('playing', $reservation->booking_status);
    }

    public function test_billiard_staff_can_view_dashboard(): void
    {
        $staff = User::factory()->create(['role' => 'billiard_staff']);

        $this->actingAs($staff)->get('/billiard/dashboard')->assertOk();
    }

    public function test_billiard_staff_can_view_table_schedule(): void
    {
        $staff = User::factory()->create(['role' => 'billiard_staff']);

        $this->actingAs($staff)->get('/billiard/table-schedule')->assertOk();
    }

    public function test_billiard_staff_can_view_playing_sessions(): void
    {
        $staff = User::factory()->create(['role' => 'billiard_staff']);

        $this->actingAs($staff)->get('/billiard/sessions')->assertOk();
    }
}
