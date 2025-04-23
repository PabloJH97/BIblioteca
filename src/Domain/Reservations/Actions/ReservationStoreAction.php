<?php

namespace Domain\Reservations\Actions;

use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class ReservationStoreAction
{
    public function __invoke(array $data): ReservationResource
    {
        $books=Book::where('ISBN', $data['ISBN'])->pluck('id')->all();
        $bookLoans=Loan::WhereIn('book_id', $books)->where('borrowed', true)->pluck('book_id')->all();
        if(count($books)>1){
            $book=array_diff($books, $bookLoans);
        }else{
            $book=[$books[0]];
        }
        $key=array_key_first($book);
        $user=User::where('email', $data['email'])->first();
        $reservation = Reservation::create([
            'book_id' => $book[$key],
            'user_id' => $user->id,
        ]);

        return ReservationResource::fromModel($reservation);
    }
}
