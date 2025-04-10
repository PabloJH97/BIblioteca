<?php

namespace Database\Factories;

use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class BookFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Book::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $zone=Zone::all()->random();
        $bookshelf=Bookshelf::all()->random();
        $genres=Genre::all()->pluck('name')->toArray();
        $genresArray=fake()->randomElements($array=$genres, $count=fake()->numberBetween(1, 2));

        return [
            'title'=>'',
            'author'=>'',
            'pages'=>fake()->numberBetween($min=10, $max=250),
            'editorial'=>'',
            'ISBN'=>fake()->isbn13(),
            'genre'=>implode(', ', $genresArray),
            'bookshelf_id'=>$bookshelf->id,
        ];
    }
}
