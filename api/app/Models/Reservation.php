<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Reservation",
 *     type="object",
 *     title="Reservation",
 *     description="A car reservation",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="user_id", type="integer", example=2),
 *     @OA\Property(property="car_id", type="integer", example=5),
 *     @OA\Property(property="reservation_date", type="string", format="date-time", example="2025-02-01T12:00:00Z"),
 *     @OA\Property(property="return_date", type="string", format="date-time", example="2025-02-10T12:00:00Z"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-01T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-02T12:00:00Z"),
 *     @OA\Property(
 *         property="car",
 *         ref="#/components/schemas/Car",
 *         description="The reserved car"
 *     )
 * )
 */
class Reservation extends Model
{
    /** @use HasFactory<\Database\Factories\ReservationFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'reservation_date', 'return_date'];

    protected $hidden = ['car_id', 'created_at', 'updated_at'];

    /**
     * Each reservation belongs to one car.
     */
    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
}
