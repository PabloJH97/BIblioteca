<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;


class ZoneUpdateAction
{
    public function __invoke(Zone $zone, array $data): ZoneResource
    {
        $updateData = [
            'genre_id' => $data['genre_id'],
            'floor_id' => $data['floor_id'],
        ];

        $zone->update($updateData);

        return ZoneResource::fromModel($zone->fresh());
    }
}
