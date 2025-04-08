<?php

namespace Domain\Loans\Actions;

use Domain\Books\Models\Book;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

use function Amp\ByteStream\split;

class LoanIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $book=$search[0];
        $user=$search[1];
        $created_at=$search[4];
        $created_date='';
        if($created_at!='null'){
            $created_date=explode('T', $created_at)[0];
            $created_date=date_sub(date_create($created_date), date_interval_create_from_date_string("1 day"))->format('Y-m-d');
            dd($created_date);
        }

        $return_date=$search[5];

        $book_id=Book::query()->when($book!='null', function ($query) use ($book){
            $query->where('title', 'ILIKE', "%".$book."%");
        })->pluck('id');

        $user_id=User::query()->when($user!='null', function ($query) use ($user){
            $query->where('name', 'ILIKE', "%".$user."%");
        })->pluck('id');


        $loans = Loan::query()
            ->when($book!='null', function ($query) use ($book_id){
                $query->WhereIn('book_id', $book_id);
            })
            ->when($user!='null', function ($query) use ($user_id){
                $query->WhereIn('user_id', $user_id);
            })
            ->when($created_at!='null', function ($query) use ($created_date){
                $query->where('created_at', 'ILIKE', "%".$created_date."%");
            })
            ->latest()
            ->paginate($perPage);

        return $loans->through(fn ($loan) => LoanResource::fromModel($loan));
    }
}
