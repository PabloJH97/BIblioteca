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
        $reservation->delete();
    }
}
