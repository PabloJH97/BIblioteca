<?php

namespace Database\Factories;

use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class LoanFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Loan::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user=User::all()->random();
        $book=Book::all()->random();
        return [
            'book_id'=>$book->id,
            'user_id'=>$user->id,
            'return_date'=>date('Y-m-d', strtotime('+1 month')),
        ];
    }
}
