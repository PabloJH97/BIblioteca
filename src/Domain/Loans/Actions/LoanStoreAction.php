<?php

namespace Domain\Loans\Actions;

use Domain\Books\Models\Book;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

class LoanStoreAction
{
    public function __invoke(array $data): LoanResource
    {
        $books=Book::where('ISBN', $data['ISBN'])->pluck('id')->all();
        $bookLoans=Loan::WhereIn('book_id', $books)->where('borrowed', true)->pluck('book_id')->all();
        $book=array_diff($books, $bookLoans);
        $key=array_key_first($book);
        $user=User::where('email', $data['email'])->first();
        $loan = Loan::create([
            'book_id' => $book[$key],
            'user_id' => $user->id,
            'return_date' => date('d/m/Y', strtotime('+1 month')),
        ]);

        return LoanResource::fromModel($loan);
    }
}
