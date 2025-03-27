<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;


class BookUpdateAction
{
    public function __invoke(Book $book, array $data): BookResource
    {
        $updateData = [
            'title' => $data['title'],
            'author' => $data['author'],
            'pages' => $data['pages'],
            'editorial' => $data['editorial'],
            'genre' => $data['genre'],
            'bookshelf_id' => $data['bookshelf_id'],
            'bookshelf' => $data['bookshelf'],
        ];

        $book->update($updateData);

        return BookResource::fromModel($book->fresh());
    }
}
