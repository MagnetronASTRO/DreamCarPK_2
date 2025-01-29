<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCarPhotoRequest;
use App\Http\Requests\UpdateCarPhotoRequest;
use App\Models\CarPhoto;

class CarPhotoController extends Controller
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
    public function store(StoreCarPhotoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CarPhoto $carPhoto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarPhotoRequest $request, CarPhoto $carPhoto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarPhoto $carPhoto)
    {
        //
    }
}
