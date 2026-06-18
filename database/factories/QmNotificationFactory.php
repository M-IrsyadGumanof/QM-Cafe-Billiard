<?php

namespace Database\Factories;

use App\Models\QmNotification;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<QmNotification> */
class QmNotificationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => null,
            'target_role' => fake()->randomElement(['admin', 'customer', 'kitchen_staff', 'billiard_staff']),
            'title' => fake()->sentence(3),
            'message' => fake()->sentence(),
            'type' => fake()->randomElement(['order', 'reservation', 'payment', 'info']),
            'is_read' => false,
        ];
    }
}
