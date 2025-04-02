<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Genres\Models\Genre;
use Symfony\Component\HttpFoundation\FileBag;

class BookUpdateAction
{
    public function __invoke(Book $book, array $data, array $genres, FileBag $files): BookResource
    {
        $genreArray=[];
        foreach($genres as $genre){
            $addingGenre=Genre::where('name', $genre)->first()->name;
            array_push($genreArray, $addingGenre);
        };
        $updateData = [
            'title' => $data['title'],
            'author' => $data['author'],
            'pages' => $data['pages'],
            'editorial' => $data['editorial'],
            'genre' => implode(', ', $genreArray),
            'bookshelf_id' => $data['bookshelf_id'],

        ];

        $book->genres()->detach();
        foreach($genres as $genre){
            $addingGenre=Genre::where('name', $genre)->first();
            $book->genres()->sync($addingGenre);
        };
        $book->update($updateData);


        return BookResource::fromModel($book->fresh());
    }
}
