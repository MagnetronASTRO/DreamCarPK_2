<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name="Reservations", description="API Endpoints for managing reservations")
 */
class ReservationController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    /**
     * @OA\Get(
     *     path="/api/reservations",
     *     summary="Get all reservations for the authenticated user",
     *     tags={"Reservations"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="include",
     *         in="query",
     *         description="Relations to include (e.g. ?include=car)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of user reservations",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Reservation")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     * )
     */
    public function index(Request $request)
    {
        // The authenticated user is automatically set by the 'auth:sanctum' middleware
        $user = $request->user();

        // Base query to fetch reservations for the authenticated user
        $query = Reservation::where('user_id', $user->id);

        // Check if 'include' query param is provided (e.g. ?include=car)
        if ($request->has('include')) {
            $includes = explode(',', $request->query('include'));
            $validRelations = ['car'];
            $relations = array_intersect($includes, $validRelations);
            $query->with($relations);
        }

        // Fetch and return reservations with optional relations
        return response()->json($query->get());
    }

    /**
     * @OA\Post(
     *     path="/api/reservations",
     *     summary="Create a new reservation",
     *     tags={"Reservations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"car_id", "reservation_date", "return_date"},
     *             @OA\Property(property="car_id", type="integer", example=1),
     *             @OA\Property(property="reservation_date", type="string", format="date-time", example="2025-02-01T12:00:00Z"),
     *             @OA\Property(property="return_date", type="string", format="date-time", example="2025-02-10T12:00:00Z")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Reservation created successfully", @OA\JsonContent(ref="#/components/schemas/Reservation")),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'reservation_date' => 'required|date',
            'return_date' => 'required|date|after:reservation_date',
        ]);

        $reservation = $request->user()->reservations()->create($fields);

        return response()->json($reservation, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/reservations/{id}",
     *     summary="Get details of a specific reservation",
     *     tags={"Reservations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Reservation ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Reservation details", @OA\JsonContent(ref="#/components/schemas/Reservation")),
     *     @OA\Response(response=404, description="Reservation not found")
     * )
     */
    public function show(Request $request, Reservation $reservation)
    {
        $relations = [];

        if ($request->has('include')) {
            $includes = explode(',', $request->query('include'));
            $validRelations = ['car'];
            $relations = array_intersect($includes, $validRelations);
        }

        return response()->JSON($reservation->load($relations));
    }

    /**
     * @OA\Put(
     *     path="/api/reservations/{id}",
     *     summary="Update an existing reservation",
     *     tags={"Reservations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Reservation ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="car_id", type="integer", example=2),
     *             @OA\Property(property="reservation_date", type="string", format="date-time", example="2025-02-05T14:00:00Z"),
     *             @OA\Property(property="return_date", type="string", format="date-time", example="2025-02-15T10:00:00Z")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Reservation updated successfully", @OA\JsonContent(ref="#/components/schemas/Reservation")),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=404, description="Reservation not found")
     * )
     */
    public function update(Request $request, Reservation $reservation)
    {
        Gate::authorize('modify', $reservation);

        $fields = $request->validate([
            'car_id' => 'exists:cars,id',
            'reservation_date' => 'date',
            'return_date' => 'date|after:reservation_date',
        ]);

        $reservation->update($fields);

        return $reservation;
    }

    /**
     * @OA\Delete(
     *     path="/api/reservations/{id}",
     *     summary="Delete a reservation",
     *     tags={"Reservations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Reservation ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Reservation deleted successfully"),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=404, description="Reservation not found")
     * )
     */
    public function destroy(Reservation $reservation)
    {
        Gate::authorize('modify', $reservation);

        $reservation->delete();

        return response()->json(['message' => 'The reservation was deleted'], 200);
    }
}
