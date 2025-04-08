<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;


class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $updateData = [
            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
            'return_date' => date('d/m/Y', strtotime('+1 month')),
        ];

        $loan->update($updateData);

        return LoanResource::fromModel($loan->fresh());
    }
}
