<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="CarPricing",
 *     type="object",
 *     title="Car Pricing",
 *     description="Pricing details of a car",
 *     @OA\Property(property="id", type="integer", example=1, description="Pricing ID"),
 *     @OA\Property(property="car_id", type="integer", example=1, description="Car ID"),
 *     @OA\Property(property="hour_price", type="number", format="float", example=15.99, description="Hourly rental price"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2025-01-01T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-01-02T12:00:00Z")
 * )
 */
class CarPricing extends Model
{
    /** @use HasFactory<\Database\Factories\CarPricingFactory> */
    use HasFactory;

    protected $fillable = ['car_id', 'hour_price'];

    protected $hidden = ['id', 'car_id', 'created_at', 'updated_at'];
}
