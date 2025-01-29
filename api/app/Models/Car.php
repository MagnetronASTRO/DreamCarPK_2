<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Car",
 *     type="object",
 *     title="Car",
 *     description="A car available for reservation",
 *     @OA\Property(property="id", type="integer", example=1, description="Car ID"),
 *     @OA\Property(property="make", type="string", example="Toyota", description="Car brand"),
 *     @OA\Property(property="model", type="string", example="Corolla", description="Car model"),
 *     @OA\Property(property="year", type="integer", example=2023, description="Manufacturing year"),
 *     @OA\Property(property="is_available", type="boolean", example=true, description="Availability status"),
 *     @OA\Property(
 *         property="pricing",
 *         ref="#/components/schemas/CarPricing",
 *         description="Pricing details for this car"
 *     ),
 *     @OA\Property(
 *         property="specs",
 *         ref="#/components/schemas/CarSpec",
 *         description="Technical specifications for this car"
 *     ),
 *     @OA\Property(
 *         property="photos",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/CarPhoto"),
 *         description="List of car photos"
 *     ),
 *     @OA\Property(
 *         property="reservations",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Reservation"),
 *         description="List of reservations for this car"
 *     )
 * )
 */
class Car extends Model
{
    /** @use HasFactory<\Database\Factories\CarFactory> */
    use HasFactory;

    protected $fillable = ['make', 'model', 'year', 'is_available'];

    protected $hidden = ['created_at', 'updated_at']; // Hide timestamps from Car model

    /**
     * Get the pricing details for the car.
     */
    public function pricing(): HasOne
    {
        return $this->hasOne(CarPricing::class);
    }

    /**
     * Get the technical specifications for the car.
     */
    public function specs(): HasOne
    {
        return $this->hasOne(CarSpec::class);
    }

    /**
     * Get all photos associated with the car.
     */
    public function photos(): HasMany
    {
        return $this->hasMany(CarPhoto::class);
    }

    /**
     * Get all reservations made for the car.
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Customize JSON serialization for relationships.
     */
    public function toArray()
    {
        $data = parent::toArray();

        if (isset($data['pricing'])) {
            unset($data['pricing']['id'], $data['pricing']['car_id'], $data['pricing']['created_at'], $data['pricing']['updated_at']);
        }

        if (isset($data['specs'])) {
            unset($data['specs']['id'], $data['specs']['car_id'], $data['specs']['created_at'], $data['specs']['updated_at']);
        }

        if (isset($data['photos'])) {
            foreach ($data['photos'] as &$photo) {
                unset($photo['id'], $photo['car_id'], $photo['created_at'], $photo['updated_at']);
            }
        }

        if (isset($data['reservations'])) {
            foreach ($data['reservations'] as &$reservation) {
                unset($reservation['id'], $reservation['car_id'], $reservation['created_at'], $reservation['updated_at']);
            }
        }

        return $data;
    }
}
