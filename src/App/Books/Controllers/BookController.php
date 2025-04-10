<?php

namespace App\Books\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\Controller;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('books/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $arrayGenres=Genre::all();
        $arrayBookshelves=Bookshelf::all();
        $arrayFloors=Floor::with(['zones', 'zones.bookshelves', 'zones.genre'])->get();
        return Inertia::render('books/Create', ['arrayGenres'=> $arrayGenres, 'arrayBookshelves'=>$arrayBookshelves, 'arrayFloors'=> $arrayFloors]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, BookStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'pages' => ['required', 'numeric', 'max:255'],
            'editorial' => ['required', 'string', 'max:255'],
            'ISBN' => ['required', 'string', 'max:255'],
            'bookshelf_id' => ['required', 'string', 'max:255'],

        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated(), $request->genre, $request->files);

        return redirect()->route('books.index')
            ->with('success', __('messages.books.created'));
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
    public function edit(Request $request, Book $book)
    {
        $media=$book->getFirstMediaUrl('images');
        $arrayGenres=Genre::all();
        $arrayBookshelves=Bookshelf::all();
        $arrayFloors=Floor::with(['zones', 'zones.bookshelves', 'zones.genre'])->get();
        return Inertia::render('books/Edit', [
            'book' => $book,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'arrayGenres'=> $arrayGenres,
            'arrayBookshelves'=>$arrayBookshelves,
            'arrayFloors'=> $arrayFloors,
            'media'=>$media
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book, BookUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'pages' => ['required', 'numeric', 'max:255'],
            'editorial' => ['required', 'string', 'max:255'],
            'ISBN' => ['required', 'string', 'max:255'],
            'bookshelf_id' => ['required', 'string', 'max:255'],

        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($book, $validator->validated(), $request->genre, $request->files);

        $redirectUrl = route('books.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.books.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book, BookDestroyAction $action)
    {
        $action($book);

        return redirect()->route('books.index')
            ->with('success', __('messages.books.deleted'));
    }
}
