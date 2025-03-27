<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books=Book::all();
        foreach($books as $book){
            $genres=explode(', ',$book->genre);
            foreach($genres as $genre){
                $genreToSync=Genre::where('name', $genre)->first();
                $book->genres()->sync($genreToSync);
            }
        }
    }
}
