<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Reservation;
use App\Models\User;

class ReservationPolicy
{
    /**
     * Determine whether the user can view any reservations.
     * Admins can view all reservations, users can only view their own.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === RoleEnum::ADMIN;
    }

    /**
     * Determine whether the user can view a specific reservation.
     * Admins can view any reservation, users can only view their own.
     */
    public function view(User $user, Reservation $reservation): bool
    {
        return $user->role === RoleEnum::ADMIN->value || $user->id === $reservation->user_id;
    }

    /**
     * Determine whether the user can create a reservation.
     * All authenticated users can create reservations.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update a reservation.
     * Users can only update their own reservations.
     */
    public function update(User $user, Reservation $reservation): bool
    {
        return $user->role === RoleEnum::ADMIN->value || $user->id === $reservation->user_id;
    }

    /**
     * Determine whether the user can delete a reservation.
     * Users can only delete their own reservations.
     */
    public function delete(User $user, Reservation $reservation): bool
    {
        return $user->role === RoleEnum::ADMIN->value || $user->id === $reservation->user_id;
    }
}
