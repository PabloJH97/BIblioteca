<?php

namespace Domain\Bookshelves\Models;

use Database\Factories\BookshelfFactory;
use Domain\Books\Models\Book;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bookshelf extends Model
{
    use HasFactory, HasUuids;
    use HasFactory, HasUuids;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return BookshelfFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'number',
        'capacity',
        'zone_id',
        'zone'
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function zones(): BelongsTo
    {
        return $this->belongsTo(Zone::class);
    }
}
