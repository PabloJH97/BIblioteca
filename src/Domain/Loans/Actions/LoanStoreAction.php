<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;


class LoanStoreAction
{
    public function __invoke(array $data): LoanResource
    {
        $loan = Loan::create([
            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
            'return_date' => date('d/m/Y', strtotime('+1 month')),
        ]);

        return LoanResource::fromModel($loan);
    }
}
