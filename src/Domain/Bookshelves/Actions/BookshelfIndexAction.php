<?php

namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;

class BookshelfIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $number=$search[0];
        $capacity=$search[1];
        $zone_name=$search[2];
        $zone='';

        if($zone_name!='null'){
            $zone=Zone::where('genre_id', Genre::where('name', 'ILIKE', "%".$zone_name."%")->first()->id)->first();
        };

        $bookshelves = Bookshelf::query()
            ->when($number!='null', function ($query) use ($number){
                $query->where('number', 'like', "%".$number."%");
            })
            ->when($capacity!='null', function ($query) use ($capacity){
                $query->where('capacity', 'like', "%".$capacity."%");
            })
            ->when($zone_name!='null', function ($query) use ($zone) {
                $query->where('zone_id', 'like', "%{$zone->id}%");
            })
            ->latest()
            ->paginate($perPage);

        return $bookshelves->through(fn ($bookshelf) => BookshelfResource::fromModel($bookshelf));
    }
}
