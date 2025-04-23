<?php

namespace Domain\Reservations\Actions;

use Domain\Books\Models\Book;
use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;


class ReservationIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $book=$search[0];
        $user=$search[1];
        $active=$search[2];


        $book_id=Book::query()->when($book!='null', function ($query) use ($book){
            $query->where('title', 'ILIKE', "%".$book."%")->withTrashed();
        })->pluck('id');

        $user_id=User::query()->when($user!='null', function ($query) use ($user){
            $query->where('name', 'ILIKE', "%".$user."%")->withTrashed();
        })->pluck('id');


        $reservations = Reservation::query()
            ->when($book!='null', function ($query) use ($book_id){
                $query->WhereIn('book_id', $book_id);
            })
            ->when($user!='null', function ($query) use ($user_id){
                $query->WhereIn('user_id', $user_id);
            })
            ->when($active!='null', function ($query) use ($active){
                $query->where('active', 'like', $active);
            })
            ->latest()
            ->paginate($perPage);

        return $reservations->through(fn ($reservation) => ReservationResource::fromModel($reservation));
    }
}
