<?php

namespace Domain\Reservations\Actions;

use Domain\Books\Models\Book;
use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class ReservationStoreAction
{
    public function __invoke(array $data): ReservationResource
    {
        $books=Book::where('ISBN', $data['ISBN'])->pluck('id')->all();
        $bookReservations=Reservation::WhereIn('book_id', $books)->where('borrowed', true)->pluck('book_id')->all();
        $book=array_diff($books, $bookReservations);
        $key=array_key_first($book);
        $user=User::where('email', $data['email'])->first();
        $reservation = Reservation::create([
            'book_id' => $book[$key],
            'user_id' => $user->id,
        ]);

        return ReservationResource::fromModel($reservation);
    }
}
