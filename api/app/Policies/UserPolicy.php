<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\User;

class UserPolicy
{
    /**
     * Only admins can view all users.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === RoleEnum::ADMIN->value;
    }

    /**
     * Admins can view any user, but users can only view their own profile.
     */
    public function view(User $user, User $targetUser): bool
    {
        return $user->role === RoleEnum::ADMIN->value || $user->id === $targetUser->id;
    }

    /**
     * Only admins can create users.
     */
    public function create(User $user): bool
    {
        return $user->role === RoleEnum::ADMIN->value;
    }

    /**
     * Admins can update any user, but users can only update their own profile.
     */
    public function update(User $user, User $targetUser): bool
    {
        return $user->role === RoleEnum::ADMIN->value || $user->id === $targetUser->id;
    }

    /**
     * Only admins can delete users.
     */
    public function delete(User $user, User $targetUser): bool
    {
        return $user->role === RoleEnum::ADMIN->value;
    }
}
