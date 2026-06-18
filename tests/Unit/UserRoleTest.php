<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRoleTest extends TestCase
{
    use RefreshDatabase;

    public function test_is_admin_returns_true_for_admin(): void
    {
        $user = User::factory()->create(['role' => 'admin']);
        $this->assertTrue($user->isAdmin());
    }

    public function test_is_admin_returns_false_for_customer(): void
    {
        $user = User::factory()->create(['role' => 'customer']);
        $this->assertFalse($user->isAdmin());
    }

    public function test_is_active_returns_true_for_active_user(): void
    {
        $user = User::factory()->create(['status' => 'active']);
        $this->assertTrue($user->isActive());
    }

    public function test_is_active_returns_false_for_inactive_user(): void
    {
        $user = User::factory()->create(['status' => 'inactive']);
        $this->assertFalse($user->isActive());
    }

    public function test_is_active_returns_false_for_suspended_user(): void
    {
        $user = User::factory()->create(['status' => 'suspended']);
        $this->assertFalse($user->isActive());
    }
}
