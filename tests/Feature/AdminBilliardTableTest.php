<?php

namespace Tests\Feature;

use App\Models\BilliardTable;
use App\Models\BilliardPackage;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class AdminBilliardTableTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private User $customer;
    private BilliardTable $table;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->customer = User::factory()->create(['role' => 'customer']);
        $this->table = BilliardTable::create([
            'table_number' => 'T01',
            'name' => 'Meja Utama 1',
            'status' => 'available',
            'description' => 'Meja di dekat jendela',
        ]);
    }

    public function test_non_admin_cannot_access_billiard_tables_index(): void
    {
        $response = $this->actingAs($this->customer)
            ->get(route('admin.billiard-tables.index'));

        // Normal users should be redirected or forbidden depending on the role middleware
        // The default role middleware typically redirects or throws 403. Let's assert redirect or 403.
        $response->assertStatus(403);
    }

    public function test_admin_can_access_billiard_tables_index(): void
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.billiard-tables.index'));

        $response->assertOk();
    }

    public function test_admin_can_store_billiard_table(): void
    {
        $response = $this->actingAs($this->admin)
            ->post(route('admin.billiard-tables.store'), [
                'table_number' => 'T02',
                'name' => 'Meja VIP 2',
                'status' => 'available',
                'description' => 'Meja VIP ruangan tertutup',
            ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('billiard_tables', [
            'table_number' => 'T02',
            'name' => 'Meja VIP 2',
            'status' => 'available',
        ]);
    }

    public function test_admin_cannot_store_duplicate_table_number(): void
    {
        $response = $this->actingAs($this->admin)
            ->post(route('admin.billiard-tables.store'), [
                'table_number' => 'T01', // Already exists
                'name' => 'Meja VIP 1',
                'status' => 'available',
            ]);

        $response->assertSessionHasErrors('table_number');
    }

    public function test_admin_can_update_billiard_table(): void
    {
        $response = $this->actingAs($this->admin)
            ->patch(route('admin.billiard-tables.update', $this->table), [
                'table_number' => 'T01',
                'name' => 'Meja Utama 1 Updated',
                'status' => 'occupied',
                'description' => 'Meja baru di-update',
            ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('billiard_tables', [
            'id' => $this->table->id,
            'name' => 'Meja Utama 1 Updated',
            'status' => 'occupied',
        ]);
    }

    public function test_admin_can_delete_billiard_table_without_reservations(): void
    {
        $response = $this->actingAs($this->admin)
            ->delete(route('admin.billiard-tables.destroy', $this->table));

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseMissing('billiard_tables', [
            'id' => $this->table->id,
        ]);
    }

    public function test_admin_cannot_delete_billiard_table_with_reservations(): void
    {
        // Create a package
        $package = BilliardPackage::create([
            'name' => 'Paket Regular 1 Jam',
            'type' => 'regular',
            'duration_minutes' => 60,
            'price' => 30000,
            'status' => 'active',
        ]);

        // Create a reservation for this table
        Reservation::create([
            'user_id' => $this->customer->id,
            'billiard_table_id' => $this->table->id,
            'billiard_package_id' => $package->id,
            'reservation_code' => 'RSV-TEST-DEL',
            'package_type' => 'regular',
            'reservation_date' => Carbon::today()->format('Y-m-d'),
            'start_time' => '10:00',
            'end_time' => '11:00',
            'duration_minutes' => 60,
            'total_price' => 30000,
            'booking_status' => 'pending',
            'payment_status' => 'unpaid',
        ]);

        $response = $this->actingAs($this->admin)
            ->delete(route('admin.billiard-tables.destroy', $this->table));

        // Should return back with error message and NOT delete the table
        $response->assertSessionHas('error', 'Meja billiard tidak dapat dihapus karena memiliki riwayat reservasi pelanggan.');
        $this->assertDatabaseHas('billiard_tables', [
            'id' => $this->table->id,
        ]);
    }

    public function test_admin_can_access_table_schedule(): void
    {
        $response = $this->actingAs($this->admin)
            ->get(route('admin.table-schedule.index'));

        $response->assertOk();
    }
}
