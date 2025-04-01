<?php

namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;


class BookshelfStoreAction
{
    public function __invoke(array $data): BookshelfResource
    {
        $zone = Bookshelf::create([
            'number' => $data['number'],
            'capacity' => $data['capacity'],
            'zone_id' => $data['zone_id'],
        ]);

        return BookshelfResource::fromModel($zone);
    }
}
