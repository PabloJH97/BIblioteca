<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;

class BookIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $title=$search[0];
        $author=$search[1];
        $pages=$search[2];
        $editorial=$search[3];
        $ISBN=$search[4];
        $genre=$search[5];
        $bookshelf=$search[6];

        $bookshelves=Bookshelf::query()
            ->when($bookshelf!='null', function($query) use ($bookshelf){
                $query->where('number', $bookshelf);
            })->pluck('id');


        $books = Book::query()
            ->when($title!='null', function ($query) use ($title) {
                $query->where('title', 'ILIKE', "%".$title."%");
            })
            ->when($author!='null', function ($query) use ($author){
                $query->where('author', 'ILIKE', "%".$author."%");
            })
            ->when($pages!='null', function ($query) use ($pages){
                $query->where('pages', 'ILIKE', "%".$pages."%");
            })
            ->when($editorial!='null', function ($query) use ($editorial){
                $query->where('editorial', 'ILIKE', "%".$editorial."%");
            })
            ->when($ISBN!='null', function ($query) use ($ISBN){
                $query->where('ISBN', 'ILIKE',  "%".$ISBN."%");
            })
            ->when($genre!='null', function ($query) use ($genre){
                $query->where('genre', 'ILIKE', "%".$genre."%");
            })
            ->when($bookshelf!='null', function($query) use ($bookshelves){
                $query->WhereIn('bookshelf_id',  $bookshelves);
            })
            ->latest()
            ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    }
}
