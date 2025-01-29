<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="CarSpec",
 *     type="object",
 *     title="Car Specifications",
 *     description="Technical specifications of a car",
 *     @OA\Property(property="id", type="integer", example=1, description="Car Specification ID"),
 *     @OA\Property(property="car_id", type="integer", example=1, description="Car ID"),
 *     @OA\Property(property="power", type="integer", example=150, description="Car engine power in HP"),
 *     @OA\Property(property="color", type="string", example="Red", description="Car color"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-01T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-02T12:00:00Z")
 * )
 */
class CarSpec extends Model
{
    /** @use HasFactory<\Database\Factories\CarSpecFactory> */
    use HasFactory;

    protected $fillable = ['car_id', 'power', 'color'];

    protected $hidden = ['id', 'car_id', 'created_at', 'updated_at'];
}
