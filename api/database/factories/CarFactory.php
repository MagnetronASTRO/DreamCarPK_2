<?php

namespace Database\Factories;

use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'make' => fake()->company(),
            'model' => fake()->word(),
            'year' => fake()->numberBetween(2000, 2024),
            'is_available' => fake()->boolean(80), // 80% chance it's available
        ];
    }
}
