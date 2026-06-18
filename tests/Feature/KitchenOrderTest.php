<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KitchenOrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_kitchen_staff_can_view_orders(): void
    {
        $kitchen = User::factory()->create(['role' => 'kitchen_staff']);

        $this->actingAs($kitchen)->get('/kitchen/orders')->assertOk();
    }

    public function test_kitchen_staff_can_view_order_detail(): void
    {
        $kitchen = User::factory()->create(['role' => 'kitchen_staff']);
        $order = Order::factory()->create();

        $this->actingAs($kitchen)->get("/kitchen/orders/{$order->id}")->assertOk();
    }

    public function test_kitchen_staff_can_update_order_status(): void
    {
        $kitchen = User::factory()->create(['role' => 'kitchen_staff']);
        $order = Order::factory()->create(['order_status' => 'processing']);

        $this->actingAs($kitchen)
            ->patch("/kitchen/orders/{$order->id}/status", ['order_status' => 'ready'])
            ->assertRedirect();

        $order->refresh();
        $this->assertSame('ready', $order->order_status);
    }

    public function test_kitchen_staff_can_view_dashboard(): void
    {
        $kitchen = User::factory()->create(['role' => 'kitchen_staff']);

        $this->actingAs($kitchen)->get('/kitchen/dashboard')->assertOk();
    }
}
