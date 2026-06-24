<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Order> */
class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'order_code' => 'ORD-'.now()->format('Ymd').'-'.fake()->unique()->numerify('####'),
            'total_amount' => fake()->numberBetween(20000, 200000),
            'order_status' => 'pending_payment',
            'payment_status' => 'unpaid',
            'payment_method' => fake()->randomElement(['transfer', 'qris', 'cash']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
