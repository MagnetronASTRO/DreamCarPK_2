<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="CarPhoto",
 *     type="object",
 *     title="Car Photo",
 *     description="Photo associated with a car",
 *     @OA\Property(property="id", type="integer", example=1, description="Photo ID"),
 *     @OA\Property(property="car_id", type="integer", example=1, description="Car ID"),
 *     @OA\Property(property="photo_name", type="string", example="toyota-corolla.jpg", description="Car photo filename"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-01T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-02T12:00:00Z")
 * )
 */
class CarPhoto extends Model
{
    /** @use HasFactory<\Database\Factories\CarPhotoFactory> */
    use HasFactory;

    protected $fillable = ['car_id', 'photo_name'];

    protected $hidden = ['id', 'car_id', 'created_at', 'updated_at'];
}
