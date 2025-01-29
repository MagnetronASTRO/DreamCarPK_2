<?php

namespace App\Enums;

enum RoleEnum: int
{
    case USER = 1;
    case ADMIN = 7;

    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    public function isUser(): bool
    {
        return $this === self::USER;
    }
}
