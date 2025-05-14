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
        $zones=Zone::with('bookshelves.books', 'genre', 'floor')->get();
        foreach($zones as $zone){
            $totalLoans=0;
            $totalReservations=0;
            foreach($zone->bookshelves as $bookshelf){
                foreach($bookshelf->books as $book){
                    $totalLoans+=$book->loans->count();
                    $totalReservations+=$book->reservations->count();
                }
            }
            if($totalLoans>0||$totalReservations>0){
                $zone->totalActions=$totalLoans+$totalReservations;
                $zone->totalActionsFront=$totalLoans+$totalReservations;
                $zone->floorName=$zone->genre->name.' '.$zone->floor->name;
                array_push($zoneData, $zone);
            }

        }
        $zoneData=collect($zoneData)->sortBy('totalActions', 0 , true)->toArray();
        $zoneData=array_values($zoneData);
        $zoneData=array_slice($zoneData, 0, 10);

        $data=['userData'=>$userData, 'bookData'=>$bookData, 'zoneData'=>$zoneData];


        return $data;
    }
}
