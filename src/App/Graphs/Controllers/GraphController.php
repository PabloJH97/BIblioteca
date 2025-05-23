<?php

namespace App\Graphs\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Graphs\Actions\GraphIndexAction;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class GraphController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GraphIndexAction $action)
    {
        Gate::authorize('reports.view');
        $data=$action();

        return Inertia::render('graphs/Index', ['data'=>$data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
