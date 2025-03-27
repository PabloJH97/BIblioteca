<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;


class BookStoreAction
{
    public function __invoke(array $data): BookResource
    {
        $book = Book::create([
            'title' => $data['title'],
            'author' => $data['author'],
            'pages' => $data['pages'],
            'editorial' => $data['editorial'],
            'genre' => $data['genre'],
            'bookshelf_id' => $data['bookshelf_id'],
            'bookshelf' => $data['bookshelf'],
        ]);

        return BookResource::fromModel($book);
    }
}
