<?php

namespace Domain\Loans\Models;

use Database\Factories\LoanFactory;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Loan extends Model
{
    use HasFactory, HasUuids;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return LoanFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'book_id',
        'user_id',
        'borrowed',
        'is_overdue',
        'return_date',
    ];

    protected $casts = [
        'return_date' => 'datetime:dd/mm/YYYY', // Change your format
        'created_at' => 'datetime:dd/mm/YYYY'
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'user_id');
    }

    public function book(): HasOne
    {
        return $this->hasOne(Book::class, 'book_id');
    }
}
