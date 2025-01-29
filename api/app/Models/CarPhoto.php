<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarPhoto extends Model
{
    /** @use HasFactory<\Database\Factories\CarPhotoFactory> */
    use HasFactory;

    protected $fillable = [
        'car_id',
        'photo_name',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
}
