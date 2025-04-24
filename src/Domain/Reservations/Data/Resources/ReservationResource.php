<?php

namespace Domain\Reservations\Data\Resources;

use Domain\Books\Models\Book;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Spatie\LaravelData\Data;

class ReservationResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $book,
        public readonly string $user,
        public readonly string $active,
    ) {
    }

    public static function fromModel(Reservation $reservation): self
    {
        return new self(
            id: $reservation->id,
            book: $reservation->book->title,
            user: $reservation->user->name,
            active: $reservation->active ? 'active' : 'inactive',
        );
    }
}
