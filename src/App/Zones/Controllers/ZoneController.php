<?php

namespace App\Zones\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Actions\ZoneDestroyAction;
use Domain\Zones\Actions\ZoneStoreAction;
use Domain\Zones\Actions\ZoneUpdateAction;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ZoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('zones/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $genres=Genre::all();
        $floors=Floor::all();

        return Inertia::render('zones/Create', ['genreArray'=> $genres, 'floorArray' => $floors]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, ZoneStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'genre_id' => ['required', 'string', 'max:255'],
            'floor_id' => ['required', 'string', 'max:255'],

        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.created'));
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
    public function edit(Request $request, Zone $zone)
    {
        $genres=Genre::all();
        $floors=Floor::all();
        return Inertia::render('zones/Edit', [
            'zone' => $zone,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'genreArray'=> $genres,
            'floorArray' => $floors
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zone $zone, ZoneUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'genre_id' => ['required', 'string', 'max:255'],
            'floor_id' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($zone, $validator->validated());

        $redirectUrl = route('zones.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.zones.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {
        $action($zone);

        return redirect()->route('zones.index')
            ->with('success', __('messages.zones.deleted'));
    }
}
