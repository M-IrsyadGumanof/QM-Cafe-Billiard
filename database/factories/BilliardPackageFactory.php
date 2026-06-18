<?php

namespace Database\Factories;

use App\Models\BilliardPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<BilliardPackage> */
class BilliardPackageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(3, true),
            'type' => 'regular',
            'duration_minutes' => fake()->randomElement([60, 120, 180]),
            'price' => fake()->numberBetween(30000, 120000),
            'description' => fake()->sentence(),
            'status' => 'active',
        ];
    }

    public function personal(): static
    {
        return $this->state(fn () => [
            'type' => 'personal',
            'duration_minutes' => null,
        ]);
    }
}
