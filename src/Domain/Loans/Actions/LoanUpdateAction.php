<?php

namespace Domain\Loans\Actions;

use Domain\Books\Models\Book;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Actions\ReservationUpdateAction;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $returned_date='';
        if($data['returned_date']=='true'){
            $returned_date=date('Y-m-d');
            $loan->forceFill([
                'borrowed' => false,
                'returned_date'=>$returned_date
            ])->save();
            if(Book::find($loan->book_id)->reservations->first()!=null){
                $action=new ReservationUpdateAction;
                $action->__invoke(Reservation::where('book_id', $loan->book_id)->where('active', true)->orderBy('created_at', 'asc')->first());
            }

        }else{
            $books=Book::where('ISBN', $data['ISBN'])->pluck('id')->all();
            $bookLoans=Loan::WhereIn('book_id', $books)->where('borrowed', true)->pluck('book_id')->all();
            $book=array_diff($books, $bookLoans);
            $key=array_key_first($book);
            $user=User::where('email', $data['email'])->first();
            $updateData = [
                'book_id' => $book[$key],
                'user_id' => $user->id,
                'return_date' => date('Y-m-d', strtotime('+1 month')),
            ];
            $loan->update($updateData);
        }


        return LoanResource::fromModel($loan->fresh());
    }
}
