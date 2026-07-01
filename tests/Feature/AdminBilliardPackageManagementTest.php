<?php

namespace Tests\Feature;

use App\Models\BilliardPackage;
use App\Models\BilliardTable;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminBilliardPackageManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_billiard_package_list(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)
            ->get('/admin/billiard-packages')
            ->assertOk();
    }

    public function test_admin_can_create_billiard_package(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)->post('/admin/billiard-packages', [
            'name' => 'Test Regular Package',
            'type' => 'regular',
            'duration_minutes' => 120,
            'price' => 50000,
            'description' => 'Paket test reguler',
            'status' => 'active',
        ])->assertRedirect();

        $this->assertDatabaseHas('billiard_packages', ['name' => 'Test Regular Package']);
    }

    public function test_admin_can_update_billiard_package(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $package = BilliardPackage::create([
            'name' => 'Old Package Name',
            'type' => 'regular',
            'duration_minutes' => 60,
            'price' => 20000,
            'description' => 'Lama',
            'status' => 'active',
        ]);

        $this->actingAs($admin)->patch("/admin/billiard-packages/{$package->id}", [
            'name' => 'Updated Package Name',
            'type' => 'personal',
            'price' => 30000,
            'description' => 'Baru',
            'status' => 'inactive',
        ])->assertRedirect();

        $package->refresh();
        $this->assertSame('Updated Package Name', $package->name);
        $this->assertSame('personal', $package->type);
        $this->assertNull($package->duration_minutes);
    }

    public function test_admin_can_delete_billiard_package_without_reservations(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $package = BilliardPackage::create([
            'name' => 'Deletable Package',
            'type' => 'regular',
            'duration_minutes' => 60,
            'price' => 20000,
            'status' => 'active',
        ]);

        $this->actingAs($admin)
            ->delete("/admin/billiard-packages/{$package->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing('billiard_packages', ['id' => $package->id]);
    }

    public function test_admin_cannot_delete_billiard_package_with_reservations(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $package = BilliardPackage::create([
            'name' => 'Non Deletable Package',
            'type' => 'regular',
            'duration_minutes' => 60,
            'price' => 20000,
            'status' => 'active',
        ]);

        $user = User::factory()->create(['role' => 'customer']);
        $table = BilliardTable::create([
            'table_number' => '10',
            'name' => 'Table 10',
            'status' => 'available',
        ]);

        Reservation::create([
            'user_id' => $user->id,
            'billiard_table_id' => $table->id,
            'billiard_package_id' => $package->id,
            'reservation_code' => 'RSV-TEST-0001',
            'package_type' => $package->type,
            'reservation_date' => now()->format('Y-m-d'),
            'start_time' => '12:00',
            'end_time' => '13:00',
            'duration_minutes' => 60,
            'total_price' => 20000,
            'booking_status' => 'pending',
            'payment_status' => 'unpaid',
        ]);

        $this->actingAs($admin)
            ->delete("/admin/billiard-packages/{$package->id}")
            ->assertRedirect();

        $this->assertDatabaseHas('billiard_packages', ['id' => $package->id]);
    }
}
