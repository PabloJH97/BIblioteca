<?php

namespace Domain\Genres\Models;

use Database\Factories\GenreFactory;
use Domain\Books\Models\Book;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Genre extends Model
{
    use HasFactory, HasUuids;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return GenreFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name'

    ];
    public function zone(): HasMany
    {
        return $this->hasMany(Zone::class);
    }

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_genre', 'genre_id', 'book_id');
    }
}
