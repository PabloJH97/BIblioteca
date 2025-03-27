<?php

namespace Domain\Bookshelves\Data\Resources;

use Domain\Bookshelves\Models\Bookshelf;
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
        return new self(
            id: $bookshelf->id,
            number: $bookshelf->number,
            capacity: $bookshelf->capacity,
            zone_id: $bookshelf->zone_id,
            zone: $bookshelf->zone,
            created_at: $bookshelf->created_at->format('Y-m-d H:i:s'),
            updated_at: $bookshelf->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
