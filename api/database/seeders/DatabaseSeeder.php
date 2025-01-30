<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Car;
use App\Models\CarPricing;
use App\Models\CarSpec;
use App\Models\CarPhoto;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Car::factory(10)->create()->each(function ($car) {
            CarPricing::factory()->create(['car_id' => $car->id]);
            CarSpec::factory()->create(['car_id' => $car->id]);
            CarPhoto::factory(3)->create(['car_id' => $car->id]); // 3 photos per car
        });

        // User::factory(10)->create();

        $testUser = User::factory()->create([
            'name' => 'TestUser',
            'email' => 'test@example.com',
            'password' => Hash::make('test1234'),
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make(env('ADMIN_PASSWORD')),
            'role' => RoleEnum::ADMIN->value,
        ]);

        Reservation::factory(4)->forUser($testUser)->create([
            'car_id' => Car::first()->id,
        ]);
    }
}
