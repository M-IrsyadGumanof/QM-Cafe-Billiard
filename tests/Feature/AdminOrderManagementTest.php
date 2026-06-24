<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminOrderManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_orders(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)->get('/admin/orders')->assertOk();
    }

    public function test_admin_can_view_order_detail(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $order = Order::factory()->create();

        $this->actingAs($admin)->get("/admin/orders/{$order->id}")->assertOk();
    }

    public function test_admin_can_update_order_status(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $order = Order::factory()->create(['order_status' => 'pending_payment']);

        $this->actingAs($admin)
            ->patch("/admin/orders/{$order->id}/status", ['order_status' => 'processing'])
            ->assertRedirect();

        $order->refresh();
        $this->assertSame('processing', $order->order_status);
    }

    public function test_admin_can_view_reservations(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)->get('/admin/bookings')->assertOk();
    }

    public function test_admin_can_update_reservation_status(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $reservation = Reservation::factory()->create(['booking_status' => 'pending']);

        $this->actingAs($admin)
            ->patch("/admin/bookings/{$reservation->id}/status", ['booking_status' => 'confirmed'])
            ->assertRedirect();

        $reservation->refresh();
        $this->assertSame('confirmed', $reservation->booking_status);
    }
}
