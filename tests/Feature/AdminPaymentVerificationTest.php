<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPaymentVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_verify_payment(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $customer = User::factory()->create(['role' => 'customer']);
        $order = Order::factory()->create(['user_id' => $customer->id, 'payment_status' => 'pending']);
        $payment = Payment::factory()->create([
            'user_id' => $customer->id,
            'order_id' => $order->id,
            'status' => 'pending',
        ]);

        $this->actingAs($admin)
            ->patch("/admin/payments/{$payment->id}/verify", [
                'status' => 'verified',
                'notes' => 'Bukti valid',
            ])
            ->assertRedirect();

        $payment->refresh();
        $this->assertSame('verified', $payment->status);
        $this->assertSame($admin->id, $payment->verified_by);
        $this->assertNotNull($payment->verified_at);

        $order->refresh();
        $this->assertSame('verified', $order->payment_status);
        $this->assertSame('processing', $order->order_status);
    }

    public function test_admin_can_reject_payment(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $customer = User::factory()->create(['role' => 'customer']);
        $order = Order::factory()->create(['user_id' => $customer->id]);
        $payment = Payment::factory()->create([
            'user_id' => $customer->id,
            'order_id' => $order->id,
            'status' => 'pending',
        ]);

        $this->actingAs($admin)
            ->patch("/admin/payments/{$payment->id}/verify", [
                'status' => 'rejected',
                'notes' => 'Bukti tidak valid',
            ])
            ->assertRedirect();

        $payment->refresh();
        $this->assertSame('rejected', $payment->status);
    }

    public function test_payment_verification_creates_notification(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $customer = User::factory()->create(['role' => 'customer']);
        $order = Order::factory()->create(['user_id' => $customer->id]);
        $payment = Payment::factory()->create([
            'user_id' => $customer->id,
            'order_id' => $order->id,
        ]);

        $this->actingAs($admin)
            ->patch("/admin/payments/{$payment->id}/verify", ['status' => 'verified']);

        $this->assertDatabaseHas('qm_notifications', [
            'user_id' => $customer->id,
            'type' => 'payment',
        ]);
    }
}
