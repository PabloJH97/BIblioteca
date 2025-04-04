<?php

namespace Domain\Zones\Actions;

use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;

class ZoneIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $genre_name=$search[0];
        $floor_name=$search[1];
        $genre='';
        $floor='';
        if($genre_name!='null'){
            $genre=Genre::where('name', 'ILIKE', "%".$genre_name."%")->first();
        }
        if($floor_name!='null'){
            $floor=Floor::where('name', 'ILIKE', "%".$floor_name."%")->first();
        }

        $zones = Zone::query()
            ->when($genre_name!='null', function ($query) use ($genre) {
                $query->where('genre_id', 'ILIKE', "%".$genre->id."%");
            })
            ->when($floor_name!='null', function ($query) use ($floor) {
                $query->where('floor_id', 'ILIKE', "%".$floor->id."%");
            })
            ->latest()
            ->paginate($perPage);

        return $zones->through(fn ($zone) => ZoneResource::fromModel($zone));
    }
}
