<?php

namespace Database\Factories;

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
        return [
            'name'=>fake()->randomElement($array=array('Literatura clásica', 'Medieval', 'Fantasía', 'Ciencia', 'Matemáticas', 'Ciencia ficción', 'Arte', 'Técnico', 'Cuento', 'Poema'), $count=1),
            'floor_id'=>$floor->id,
            'floor'=>$floor->name,
        ];
    }
}
