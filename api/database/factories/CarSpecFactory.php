<?php

namespace Database\Factories;

use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarSpec>
 */
class CarSpecFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            'car_id' => Car::factory(),
            'power' => fake()->numberBetween(50, 500), // Power between 50 to 500 HP
            'color' => fake()->safeColorName(),
        ];
    }
}
