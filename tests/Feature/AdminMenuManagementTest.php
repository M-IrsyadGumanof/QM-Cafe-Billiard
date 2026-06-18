<?php

namespace Tests\Feature;

use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminMenuManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_menu_list(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)
            ->get('/admin/menu')
            ->assertOk();
    }

    public function test_admin_can_create_menu(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $category = MenuCategory::factory()->create();

        $this->actingAs($admin)->post('/admin/menu', [
            'menu_category_id' => $category->id,
            'name' => 'Nasi Goreng Test',
            'description' => 'Nasi goreng enak',
            'price' => 25000,
            'stock' => 10,
            'status' => 'available',
        ])->assertRedirect();

        $this->assertDatabaseHas('menus', ['name' => 'Nasi Goreng Test']);
    }

    public function test_admin_can_update_menu(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $category = MenuCategory::factory()->create();
        $menu = Menu::factory()->create(['menu_category_id' => $category->id]);

        $this->actingAs($admin)->patch("/admin/menu/{$menu->id}", [
            'menu_category_id' => $category->id,
            'name' => 'Updated Menu',
            'description' => 'Updated',
            'price' => 30000,
            'stock' => 5,
            'status' => 'available',
        ])->assertRedirect();

        $menu->refresh();
        $this->assertSame('Updated Menu', $menu->name);
    }

    public function test_admin_can_delete_menu_without_orders(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $menu = Menu::factory()->create();

        $this->actingAs($admin)
            ->delete("/admin/menu/{$menu->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing('menus', ['id' => $menu->id]);
    }

    public function test_admin_cannot_delete_menu_with_orders(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $menu = Menu::factory()->create();
        OrderItem::factory()->create(['menu_id' => $menu->id]);

        $this->actingAs($admin)
            ->delete("/admin/menu/{$menu->id}")
            ->assertRedirect();

        $this->assertDatabaseHas('menus', ['id' => $menu->id]);
    }
}
