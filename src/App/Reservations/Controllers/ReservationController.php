<?php

namespace App\Reservations\Controllers;

use App\Core\Controllers\Controller;
use Domain\Reservations\Actions\ReservationDestroyAction;
use Domain\Reservations\Actions\ReservationStoreAction;
use Domain\Reservations\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('reservations/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('reservations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ReservationStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'ISBN' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('reservations.index')
            ->with('success', __('messages.reservations.created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Reservation $reservation, ReservationUpdateAction $action)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'ISBN' => ['string', 'max:255'],
    //         'email' => ['string', 'max:255'],
    //     ]);

    //     if ($validator->fails()) {
    //         return back()->withErrors($validator);
    //     }

    //     $action($reservation, $validator->validated());

    //     $redirectUrl = route('reservations.index');

    //     // Añadir parámetros de página a la redirección si existen
    //     if ($request->has('page')) {
    //         $redirectUrl .= "?page=" . $request->query('page');
    //         if ($request->has('perPage')) {
    //             $redirectUrl .= "&per_page=" . $request->query('perPage');
    //         }
    //     }

    //     return redirect($redirectUrl)
    //         ->with('success', __('messages.reservations.updated'));
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation, ReservationDestroyAction $action)
    {
        $action($reservation);

        return redirect()->route('reservations.index')
            ->with('success', __('messages.reservations.deleted'));
    }
}
