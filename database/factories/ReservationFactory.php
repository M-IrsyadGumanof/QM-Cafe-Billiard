<?php

namespace Database\Factories;

use App\Models\BilliardPackage;
use App\Models\BilliardTable;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Reservation> */
class ReservationFactory extends Factory
{
    public function definition(): array
    {
        $startHour = fake()->numberBetween(10, 20);

        return [
            'user_id' => User::factory(),
            'billiard_table_id' => BilliardTable::factory(),
            'billiard_package_id' => BilliardPackage::factory(),
            'reservation_code' => 'RSV-'.now()->format('Ymd').'-'.fake()->unique()->numerify('####'),
            'package_type' => 'regular',
            'reservation_date' => now()->addDays(fake()->numberBetween(1, 7))->toDateString(),
            'start_time' => sprintf('%02d:00', $startHour),
            'end_time' => sprintf('%02d:00', $startHour + 1),
            'duration_minutes' => 60,
            'total_price' => fake()->numberBetween(40000, 120000),
            'booking_status' => 'pending',
            'payment_status' => 'unpaid',
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
