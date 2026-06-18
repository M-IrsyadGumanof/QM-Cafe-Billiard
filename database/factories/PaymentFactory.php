<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Payment> */
class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'order_id' => Order::factory(),
            'reservation_id' => null,
            'payment_code' => 'PAY-'.now()->format('Ymd').'-'.fake()->unique()->numerify('####'),
            'payment_method' => fake()->randomElement(['transfer', 'qris']),
            'amount' => fake()->numberBetween(20000, 200000),
            'proof_image' => null,
            'status' => 'pending',
            'verified_by' => null,
            'verified_at' => null,
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
