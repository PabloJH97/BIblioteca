<?php

namespace Domain\Graphs\Actions;

use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Domain\Zones\Models\Zone;

class GraphIndexAction
{
    public function __invoke()
    {
        $userData=[];
        $users=User::withCount('loans', 'reservations')->get()->toArray();
        foreach($users as $user){
            array_push($userData, $user);
        }
        $bookData=[];
        $books=Book::withCount('loans')->get()->toArray();
        foreach($books as $book){
            array_push($bookData, $book);
        }
        $zoneData=[];
        $zones=Zone::with('bookshelves.books')->get();
        foreach($zones as $zone){
            $totalLoans=0;
            $totalReservations=0;
            foreach($zone->bookshelves as $bookshelf){
                foreach($bookshelf->books as $book){
                    $totalLoans+=$book->loans->count();
                    $totalReservations+=$book->reservations->count();
                }
            }
            array_push($zoneData, [$zone, $totalLoans, $totalReservations]);
        }


        $data=['userData'=>$userData, 'bookData'=>$bookData, 'zoneData'=>$zoneData];


        return $data;
    }
}
