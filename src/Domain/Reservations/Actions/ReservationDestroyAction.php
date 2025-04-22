<?php

namespace Domain\Reservations\Actions;

use App\Notifications\ReservationMail;
use Domain\Books\Models\Book;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class ReservationDestroyAction
{
    public function __invoke(Reservation $reservation): void
    {
        $user=User::where('id', $reservation->user_id)->first();
        $book=Book::where('id', $reservation->book_id)->first();
        $user->notify(new ReservationMail($user, $book));
        $reservation->delete();
    }
}
