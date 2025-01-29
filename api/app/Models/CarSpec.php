<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarSpec extends Model
{
    /** @use HasFactory<\Database\Factories\CarSpecFactory> */
    use HasFactory;

    protected $fillable = [
        'power',
        'color',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
}
