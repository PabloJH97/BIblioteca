<?php

namespace Database\Factories;

use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class GenreFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Genre::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->unique()->randomElement($array=array('Literatura clásica', 'Medieval', 'Fantasía', 'Ciencia', 'Matemáticas', 'Ciencia ficción', 'Arte', 'Técnico', 'Cuento', 'Poema')),
        ];
    }
}
