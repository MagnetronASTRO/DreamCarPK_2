<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Car extends Model
{
    /** @use HasFactory<\Database\Factories\CarFactory> */
    use HasFactory;

    protected $fillable = [
        'make',
        'model',
        'year',
        'is_available',
    ];

    public function pricing(): HasOne
    {
        return $this->hasOne(CarPricing::class);
    }

    public function specs(): HasOne
    {
        return $this->hasOne(CarSpec::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(CarPhoto::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
