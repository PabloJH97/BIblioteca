<?php

namespace Domain\Books\Models;

use Database\Factories\BookFactory;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Genres\Models\Genre;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Book extends Model implements HasMedia
{
    use HasFactory, HasUuids;
    use InteractsWithMedia;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return BookFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'title',
        'author',
        'pages',
        'editorial',
        'genre',
        'bookshelf_id',
        'bookshelf'
    ];

    public function bookshelves(): BelongsTo
    {
        return $this->belongsTo(Bookshelf::class);
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'book_genre', 'book_id', 'genre_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'book_user', 'book_id', 'user_id');
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function activeLoans(): HasOne
    {
        return $this->hasOne(Loan::class)->where('borrowed', true);
    }


}
