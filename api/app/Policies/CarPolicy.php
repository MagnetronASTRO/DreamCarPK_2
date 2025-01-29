<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Car;
use App\Models\User;

class CarPolicy
{
    /**
     * Anyone can view cars.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Car $car): bool
    {
        return true;
    }

    /**
     * Only admins can create cars.
     */
    public function create(User $user): bool
    {
        return $user->role === RoleEnum::ADMIN->value;
    }

    /**
     * Only admins can update cars.
     */
    public function update(User $user, Car $car): bool
    {
        return $user->role === RoleEnum::ADMIN->value;
    }

    /**
     * Only admins can delete cars.
     */
    public function delete(User $user, Car $car): bool
    {
        return $user->role === RoleEnum::ADMIN->value;
    }
}
