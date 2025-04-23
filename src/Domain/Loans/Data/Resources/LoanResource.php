<?php

namespace Domain\Loans\Data\Resources;

use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Spatie\LaravelData\Data;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $book,
        public readonly string $user,
        public readonly string $borrowed,
        public readonly string $is_overdue,
        public readonly string $created_at,
        public readonly string $return_date,
        public readonly string $returned_date,
    ) {
    }

    public static function fromModel(Loan $loan): self
    {
        $returned='No devuelto';
        $overdue='Sin retraso';
        if($loan->returned_date!=null){
            $returned=date_create($loan->returned_date)->format('d-m-Y');
        }
        if($loan->is_overdue&&$loan->borrowed&&date_create($loan->return_date)->diff(date_create(date('Y-m-d')))->d!=0){
            $overdue=date_create($loan->return_date)->diff(date_create(date('Y-m-d')))->format('%a días');
        }elseif($loan->is_overdue&&!$loan->borrowed){
            $overdue=date_create($loan->returned_date)->diff(date_create($loan->return_date))->format('%a días');
        }

        return new self(
            id: $loan->id,
            book: $loan->book->title,
            user: $loan->user->name,
            borrowed: $loan->borrowed ? 'En préstamo' : 'Devuelto',
            is_overdue: $overdue,
            created_at: $loan->created_at->format('d-m-Y H:i:s'),
            return_date: $loan->return_date->format('d-m-Y'),
            returned_date: $returned,

        );
    }
}
