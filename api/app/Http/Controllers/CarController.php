<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name="Cars", description="API Endpoints for managing cars")
 */
class CarController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * @OA\Get(
     *     path="/api/cars",
     *     summary="Get a list of all cars",
     *     tags={"Cars"},
     *     @OA\Response(
     *         response=200,
     *         description="List of all cars",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Car"))
     *     )
     * )
     */
    public function index()
    {
        return Car::all();
    }

    /**
     * @OA\Post(
     *     path="/api/cars",
     *     summary="Create a new car",
     *     tags={"Cars"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"make", "model", "year"},
     *             @OA\Property(property="make", type="string", example="Toyota"),
     *             @OA\Property(property="model", type="string", example="Corolla"),
     *             @OA\Property(property="year", type="integer", example=2023),
     *             @OA\Property(property="is_available", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Car created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Car")
     *     ),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function store(Request $request)
    {
        Gate::authorize('create', Car::class);

        $fields = $request->validate([
            'make' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'is_available' => 'boolean',
        ]);

        $car = Car::create($fields);

        return response()->json($car, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/cars/{id}",
     *     summary="Get details of a specific car",
     *     tags={"Cars"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Car ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Car details",
     *         @OA\JsonContent(ref="#/components/schemas/Car")
     *     ),
     *     @OA\Response(response=404, description="Car not found")
     * )
     */
    public function show(Request $request, Car $car)
    {
        $relations = [];

        if ($request->has('include')) {
            $includes = explode(',', $request->query('include'));
            $validRelations = ['pricing', 'specs', 'photos', 'reservations'];
            $relations = array_intersect($includes, $validRelations);
        }

        return $car->load($relations);
    }

    /**
     * @OA\Put(
     *     path="/api/cars/{id}",
     *     summary="Update an existing car",
     *     tags={"Cars"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Car ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="make", type="string", example="Honda"),
     *             @OA\Property(property="model", type="string", example="Civic"),
     *             @OA\Property(property="year", type="integer", example=2022),
     *             @OA\Property(property="is_available", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Car updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Car")
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=404, description="Car not found")
     * )
     */
    public function update(Request $request, Car $car)
    {
        Gate::authorize('update', $car);

        $fields = $request->validate([
            'make' => 'string|max:50',
            'model' => 'string|max:50',
            'year' => 'integer|min:1900|max:' . date('Y'),
            'is_available' => 'boolean',
        ]);

        $car->update($fields);

        return response()->json($car);
    }

    /**
     * @OA\Delete(
     *     path="/api/cars/{id}",
     *     summary="Delete a car",
     *     tags={"Cars"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Car ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Car deleted successfully"),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=404, description="Car not found")
     * )
     */
    public function destroy(Car $car)
    {
        Gate::authorize('delete', $car);

        $car->delete();

        return response()->json(['message' => 'The car was deleted'], 200);
    }
}
