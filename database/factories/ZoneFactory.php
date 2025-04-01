<?php

namespace Database\Factories;

use Domain\Genres\Models\Genre;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class ZoneFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Zone::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array

    {
        $floor=Floor::all()->random();
        $genre=Genre::all()->random();
        return [
            'genre_id'=>$genre->id,
            'floor_id'=>$floor->id,
        ];
    }
}
