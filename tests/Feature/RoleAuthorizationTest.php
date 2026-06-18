<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_cannot_access_admin_routes(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $this->actingAs($customer)->get('/dashboard')->assertForbidden();
        $this->actingAs($customer)->get('/admin/users')->assertForbidden();
        $this->actingAs($customer)->get('/admin/menu')->assertForbidden();
        $this->actingAs($customer)->get('/admin/orders')->assertForbidden();
    }

    public function test_customer_cannot_access_kitchen_routes(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $this->actingAs($customer)->get('/kitchen/dashboard')->assertForbidden();
        $this->actingAs($customer)->get('/kitchen/orders')->assertForbidden();
    }

    public function test_customer_cannot_access_billiard_routes(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $this->actingAs($customer)->get('/billiard/dashboard')->assertForbidden();
        $this->actingAs($customer)->get('/billiard/reservations')->assertForbidden();
    }

    public function test_customer_cannot_access_owner_routes(): void
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $this->actingAs($customer)->get('/owner/dashboard')->assertForbidden();
        $this->actingAs($customer)->get('/owner/reports')->assertForbidden();
    }

    public function test_kitchen_staff_cannot_access_admin_routes(): void
    {
        $kitchen = User::factory()->create(['role' => 'kitchen_staff']);

        $this->actingAs($kitchen)->get('/dashboard')->assertForbidden();
        $this->actingAs($kitchen)->get('/admin/users')->assertForbidden();
    }

    public function test_billiard_staff_cannot_access_kitchen_routes(): void
    {
        $billiard = User::factory()->create(['role' => 'billiard_staff']);

        $this->actingAs($billiard)->get('/kitchen/dashboard')->assertForbidden();
        $this->actingAs($billiard)->get('/kitchen/orders')->assertForbidden();
    }

    public function test_guest_cannot_access_protected_routes(): void
    {
        $this->get('/customer/dashboard')->assertRedirect('/login');
        $this->get('/dashboard')->assertRedirect('/login');
        $this->get('/kitchen/dashboard')->assertRedirect('/login');
        $this->get('/billiard/dashboard')->assertRedirect('/login');
        $this->get('/owner/dashboard')->assertRedirect('/login');
    }
}
