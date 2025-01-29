<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCarSpecRequest;
use App\Http\Requests\UpdateCarSpecRequest;
use App\Models\CarSpec;

class CarSpecController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarSpecRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CarSpec $carSpec)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarSpecRequest $request, CarSpec $carSpec)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarSpec $carSpec)
    {
        //
    }
}
