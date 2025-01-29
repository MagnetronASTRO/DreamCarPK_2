<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reservationDate = fake()->dateTimeBetween('-1 month', '+1 month');
        $returnDate = fake()->dateTimeBetween($reservationDate, '+10 days');

        return [
            'user_id' => User::factory(), // Default factory-generated user
            'car_id' => Car::factory(),  // Default factory-generated car
            'reservation_date' => $reservationDate,
            'return_date' => $returnDate,
            'created_at' => now(),
        ];
    }

    /**
     * Assign reservation to a specific user.
     */
    public function forUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }}
