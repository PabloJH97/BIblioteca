<?php

namespace Domain\Loans\Actions;

use Domain\Books\Models\Book;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $returned_date='';
        if($data['returned_date']=='true'){
            $returned_date=date('m-d-Y');
            $loan->forceFill([
                'borrowed' => false,
                'returned_date'=>$returned_date
            ])->save();
        }else{
            $books=Book::where('ISBN', $data['ISBN'])->pluck('id')->all();
            $bookLoans=Loan::WhereIn('book_id', $books)->where('borrowed', true)->pluck('book_id')->all();
            $book=array_diff($books, $bookLoans);
            $key=array_key_first($book);
            $user=User::where('email', $data['email'])->first();
            $updateData = [
                'book_id' => $book[$key],
                'user_id' => $user->id,
                'return_date' => date('d/m/Y', strtotime('+1 month')),
            ];
            $loan->update($updateData);
        }


        return LoanResource::fromModel($loan->fresh());
    }
}
