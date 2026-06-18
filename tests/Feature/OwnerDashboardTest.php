<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OwnerDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_view_dashboard(): void
    {
        $owner = User::factory()->create(['role' => 'owner']);

        $this->actingAs($owner)->get('/owner/dashboard')->assertOk();
    }

    public function test_owner_can_view_reports(): void
    {
        $owner = User::factory()->create(['role' => 'owner']);

        $this->actingAs($owner)->get('/owner/reports')->assertOk();
    }

    public function test_owner_can_export_reports(): void
    {
        $owner = User::factory()->create(['role' => 'owner']);

        $this->actingAs($owner)->get('/owner/reports/export?type=payments')->assertOk();
        $this->actingAs($owner)->get('/owner/reports/export?type=orders')->assertOk();
        $this->actingAs($owner)->get('/owner/reports/export?type=reservations')->assertOk();
    }
}
