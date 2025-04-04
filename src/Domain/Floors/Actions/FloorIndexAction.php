<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;

class FloorIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $name=$search[0];

        $floors = Floor::query()
            ->when($name!='null', function ($query) use ($name){
                $query->where('name', 'ILIKE', "%".$name."%");
            })
            ->latest()
            ->paginate($perPage);

        return $floors->through(fn ($floor) => FloorResource::fromModel($floor));
    }
}
