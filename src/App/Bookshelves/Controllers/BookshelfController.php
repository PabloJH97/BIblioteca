<?php

namespace App\Bookshelves\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Bookshelves\Actions\BookshelfDestroyAction;
use Domain\Bookshelves\Actions\BookshelfStoreAction;
use Domain\Bookshelves\Actions\BookshelfUpdateAction;
use Domain\Bookshelves\Models\Bookshelf;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BookshelfController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('bookshelves/Index');
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
    public function store(Request $request, BookshelfStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', 'int', 'max:255'],
            'capacity' => ['required', 'int', 'max:255'],
            'zone_id' => ['required', 'string', 'max:255'],
            'zone' => ['required', 'string', 'max:255'],

        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('bookshelves.index')
            ->with('success', __('messages.bookshelves.created'));
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
    public function update(Request $request, Bookshelf $bookshelf, BookshelfUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', 'int', 'max:255'],
            'capacity' => ['required', 'int', 'max:255'],
            'zone_id' => ['required', 'string', 'max:255'],
            'zone' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($bookshelf, $validator->validated());

        $redirectUrl = route('bookshelves.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.bookshelves.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookshelf $bookshelf, BookshelfDestroyAction $action)
    {
        $action($bookshelf);

        return redirect()->route('bookshelves.index')
            ->with('success', __('messages.bookshelves.deleted'));
    }
}
