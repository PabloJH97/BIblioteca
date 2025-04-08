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
    ) {
    }

    public static function fromModel(Loan $loan): self
    {
        return new self(
            id: $loan->id,
            book: Book::where('id', $loan->book_id)->first()->title,
            user: User::where('id', $loan->user_id)->first()->name,
            borrowed: $loan->borrowed ? 'En préstamo' : 'Devuelto',
            is_overdue: $loan->is_overdue ? 'Con retraso' : 'Sin retraso',
            created_at: $loan->created_at->format('Y-m-d H:i:s'),
            return_date: $loan->return_date->format('Y-m-d H:i:s'),

        );
    }
}
