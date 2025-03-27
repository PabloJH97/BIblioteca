<?php

namespace App\Bookshelves\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Bookshelves\Actions\BookshelfDestroyAction;
use Domain\Bookshelves\Actions\BookshelfIndexAction;
use Domain\Bookshelves\Actions\BookshelfStoreAction;
use Domain\Bookshelves\Actions\BookshelfUpdateAction;
use Domain\Bookshelves\Models\Bookshelf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class BookshelfApiController extends Controller
{
    public function index(Request $request, BookshelfIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Bookshelf $bookshelf)
    {
        return response()->json(['bookshelf' => $bookshelf]);
    }

    public function store(Request $request, BookshelfStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', 'int', 'max:255'],
            'capacity' => ['required', 'int', 'max:255'],
            'zone_id' => ['required', 'string', 'max:255'],
            'zone' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $bookshelf = $action($validator->validated());

        return response()->json([
            'message' => __('messages.bookshelves.created'),
            'bookshelf' => $bookshelf
        ]);
    }

    public function update(Request $request, Bookshelf $bookshelf, BookshelfUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'number' => ['required', 'int', 'max:255'],
            'capacity' => ['required', 'int', 'max:255'],
            'zone_id' => ['required', 'string', 'max:255'],
            'zone' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedBookshelf = $action($bookshelf, $validator->validated());

        return response()->json([
            'message' => __('messages.bookshelves.updated'),
            'bookshelf' => $updatedBookshelf
        ]);
    }

    public function destroy(Bookshelf $bookshelf, BookshelfDestroyAction $action)
    {
        $action($bookshelf);

        return response()->json([
            'message' => __('messages.bookshelves.deleted')
        ]);
    }
}
