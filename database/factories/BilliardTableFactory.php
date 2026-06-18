<?php

namespace Database\Factories;

use App\Models\BilliardTable;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<BilliardTable> */
class BilliardTableFactory extends Factory
{
    public function definition(): array
    {
        return [
            'table_number' => 'TBL-'.fake()->unique()->numerify('##'),
            'name' => 'Table '.fake()->unique()->numberBetween(1, 99),
            'status' => 'available',
            'description' => fake()->sentence(),
        ];
    }
}
