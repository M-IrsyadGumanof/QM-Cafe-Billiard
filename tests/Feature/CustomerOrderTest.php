<?php

namespace Tests\Feature;

use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerOrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_create_order(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        $category = MenuCategory::factory()->create();
        $menu = Menu::factory()->create([
            'menu_category_id' => $category->id,
            'price' => 25000,
            'status' => 'available',
        ]);

        $response = $this->actingAs($customer)->post('/customer/checkout', [
            'items' => [
                ['menu_id' => $menu->id, 'quantity' => 2],
            ],
            'payment_method' => 'qris',
            'notes' => 'Test order',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'user_id' => $customer->id,
            'total_amount' => 50000,
            'payment_method' => 'qris',
        ]);
        $this->assertDatabaseCount('order_items', 1);
        $this->assertDatabaseHas('qm_notifications', ['type' => 'order', 'target_role' => 'admin']);
    }

    public function test_customer_can_view_order_list(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        Order::factory()->create(['user_id' => $customer->id]);

        $this->actingAs($customer)
            ->get('/customer/orders')
            ->assertOk();
    }

    public function test_customer_can_view_own_order_detail(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        $order = Order::factory()->create(['user_id' => $customer->id]);

        $this->actingAs($customer)
            ->get("/customer/orders/{$order->id}")
            ->assertOk();
    }

    public function test_customer_cannot_view_other_customer_order(): void
    {
        $customer1 = User::factory()->create(['role' => 'customer']);
        $customer2 = User::factory()->create(['role' => 'customer']);
        $order = Order::factory()->create(['user_id' => $customer1->id]);

        $this->actingAs($customer2)
            ->get("/customer/orders/{$order->id}")
            ->assertForbidden();
    }

    public function test_order_rejects_unavailable_menu(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);
        $menu = Menu::factory()->create(['status' => 'unavailable']);

        $this->actingAs($customer)->post('/customer/checkout', [
            'items' => [['menu_id' => $menu->id, 'quantity' => 1]],
            'payment_method' => 'cash',
        ])->assertStatus(422);
    }

    public function test_order_validation_requires_items(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $this->actingAs($customer)->post('/customer/checkout', [
            'items' => [],
            'payment_method' => 'cash',
        ])->assertSessionHasErrors('items');
    }
}
