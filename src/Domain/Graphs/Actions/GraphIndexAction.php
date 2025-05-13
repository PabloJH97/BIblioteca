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
        $users=User::withCount('loans', 'reservations')->get();
        foreach($users as $user){
            if($user->loans_count>0||$user->reservations_count>0){
                $user->totalActions=$user->loans_count+$user->reservations_count;
                array_push($userData, $user);
            }
        }
        $userData=collect($userData)->sortBy('totalActions', 0 , 'desc')->toArray();
        $userData=array_values($userData);
        $userData=array_slice($userData, 0, 10);
        $bookData=[];
        $books=Book::withCount('loans', 'reservations')->get();
        foreach($books as $book){
            if($book->loans_count>0||$book->reservations_count>0){
                $book->totalActions=$book->loans_count+$book->reservations_count;
                array_push($bookData, $book);
            }
        }
        $bookData=collect($bookData)->sortBy('totalActions', 0 , true)->toArray();
        $bookData=array_values($bookData);
        $bookData=array_slice($bookData, 0, 10);
        $zoneData=[];
        $zones=Zone::with('bookshelves.books', 'genre')->get();
        foreach($zones as $zone){
            $totalLoans=0;
            $totalReservations=0;
            foreach($zone->bookshelves as $bookshelf){
                foreach($bookshelf->books as $book){
                    $totalLoans+=$book->loans->count();
                    $totalReservations+=$book->reservations->count();
                }
            }
            $zone->genre->totalActions=$totalLoans+$totalReservations;
            array_push($zoneData, ['zone'=>$zone]);
        }

        $data=['userData'=>$userData, 'bookData'=>$bookData, 'zoneData'=>$zoneData];


        return $data;
    }
}
