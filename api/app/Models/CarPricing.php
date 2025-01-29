<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarPricing extends Model
{
    /** @use HasFactory<\Database\Factories\CarPricingFactory> */
    use HasFactory;

    protected $fillable = [
        'hour_price',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
}
