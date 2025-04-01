<?php

namespace Database\Factories;

use Domain\Bookshelves\Models\Bookshelf;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class BookshelfFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Bookshelf::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $zone=Zone::all()->random();
        return [
            'number'=>fake()->numberBetween($min=1, $max=20),
            'capacity'=>fake()->numberBetween($min=20, $max=30),
            'zone_id'=>$zone->id,
        ];
    }
}
