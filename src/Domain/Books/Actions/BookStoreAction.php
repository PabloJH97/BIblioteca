<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Genres\Models\Genre;
use Symfony\Component\HttpFoundation\FileBag;

class BookStoreAction
{
    public function __invoke(array $data, array $genres, FileBag $files): BookResource
    {
        $genreArray=[];
        foreach($genres as $genre){
            $addingGenre=Genre::where('name', $genre)->first()->name;
            array_push($genreArray, $addingGenre);
        };
        $book = Book::create([
            'title' => $data['title'],
            'author' => $data['author'],
            'pages' => $data['pages'],
            'editorial' => $data['editorial'],
            'ISBN' => $data['ISBN'],
            'genre' => implode(', ', $genreArray),
            'bookshelf_id' => $data['bookshelf_id'],
        ]);
        foreach($genres as $genre){
            $addingGenre=Genre::where('name', $genre)->first();
            $book->genres()->sync($addingGenre);
        };
        foreach($files as $file){
            $book->addMedia($file)->toMediaCollection('images', 'images');
        };

        return BookResource::fromModel($book);
    }
}
