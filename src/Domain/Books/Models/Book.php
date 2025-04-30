<?php

namespace Domain\Books\Models;

use Database\Factories\BookFactory;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Genres\Models\Genre;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Type\Integer;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Book extends Model implements HasMedia
{
    use HasFactory, HasUuids, SoftDeletes;
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
        'ISBN',
        'genre',
        'bookshelf_id',
        'bookshelf'
    ];

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function image(): string
    {
        return $this->getFirstMediaUrl();
    }

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
        return $this->belongsToMany(User::class, 'book_user', 'book_id', 'user_id')->withTrashed();
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class)->withTrashed();
    }

    public function activeLoans(): HasOne
    {
        return $this->hasOne(Loan::class)->where('borrowed', true);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class)->where('active', true);
    }

}
