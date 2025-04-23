<?php

namespace Domain\Books\Data\Resources;

use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Genres\Models\Genre;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $author,
        public readonly int $pages,
        public readonly string $editorial,
        public readonly string $ISBN,
        public readonly string $genre,
        public readonly bool $hasActive,
        public readonly string $bookshelf_id,
        public readonly string $bookshelf,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        $bookshelf=Bookshelf::where('id', $book->bookshelf_id)->first();

        $ActiveBool = $book->activeLoans()->first() !== null;

        return new self(
            id: $book->id,
            title: $book->title,
            author: $book->author,
            pages: $book->pages,
            editorial: $book->editorial,
            ISBN: $book->ISBN,
            genre: $book->genre,
            hasActive: $ActiveBool,
            bookshelf_id: $book->bookshelf_id,
            bookshelf: $bookshelf->number,
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
