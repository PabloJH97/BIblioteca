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
        $borrowed=$search[2];
        $is_overdue=$search[3];
        $created_at=$search[4];
        $return_date=$search[5];
        $returned_date='';
        $created_date='';
        if($created_at!='null'){
            $created_date=explode('T', $created_at)[0];

        }
        if($return_date!='null'){
           $returned_date=date_create(explode('T', $return_date)[0])->format('Y-m-d');
        }


        $book_id=Book::query()->when($book!='null', function ($query) use ($book){
            $query->where('title', 'ILIKE', "%".$book."%")->withTrashed();
        })->pluck('id');

        $user_id=User::query()->when($user!='null', function ($query) use ($user){
            $query->where('name', 'ILIKE', "%".$user."%")->withTrashed();
        })->pluck('id');


        $loans = Loan::query()
            ->when($book!='null', function ($query) use ($book_id){
                $query->WhereIn('book_id', $book_id);
            })
            ->when($user!='null', function ($query) use ($user_id){
                $query->WhereIn('user_id', $user_id);
            })
            ->when($borrowed!='null', function ($query) use ($borrowed){
                $query->where('borrowed', 'like', $borrowed);
            })
            ->when($is_overdue!='null', function ($query) use ($is_overdue){
                $query->where('is_overdue', 'like', $is_overdue);
            })
            ->when($created_at!='null', function ($query) use ($created_date){
                $query->where('created_at', 'ILIKE', "%".$created_date."%");
            })
            ->when($return_date!='null', function ($query) use ($returned_date){
                $query->where('return_date', 'ILIKE', "%".$returned_date."%");
            })
            ->latest()
            ->paginate($perPage);

        return $loans->through(fn ($loan) => LoanResource::fromModel($loan));
    }
}
