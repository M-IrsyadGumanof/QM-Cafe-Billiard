<?php

namespace Database\Factories;

use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<Menu> */
class MenuFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'menu_category_id' => MenuCategory::factory(),
            'name' => ucwords($name),
            'slug' => Str::slug($name).'-'.Str::random(4),
            'description' => fake()->sentence(),
            'price' => fake()->numberBetween(10000, 100000),
            'image' => null,
            'stock' => fake()->numberBetween(5, 50),
            'status' => 'available',
        ];
    }
}
