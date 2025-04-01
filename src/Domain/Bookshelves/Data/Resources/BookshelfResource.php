<?php

namespace Domain\Bookshelves\Data\Resources;

use Domain\Bookshelves\Models\Bookshelf;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class BookshelfResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $number,
        public readonly int $capacity,
        public readonly string $zone_id,
        public readonly string $zone,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Bookshelf $bookshelf): self
    {
        $genre=Genre::where('id', Zone::where('id', $bookshelf->zone_id)->first()->genre_id)->first();

        return new self(
            id: $bookshelf->id,
            number: $bookshelf->number,
            capacity: $bookshelf->capacity,
            zone_id: $bookshelf->zone_id,
            zone: $genre->name,
            created_at: $bookshelf->created_at->format('Y-m-d H:i:s'),
            updated_at: $bookshelf->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
