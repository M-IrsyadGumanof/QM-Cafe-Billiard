<?php

namespace Database\Factories;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Gallery> */
class GalleryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->words(3, true),
            'image' => null,
            'description' => fake()->sentence(),
            'status' => 'active',
        ];
    }
}
