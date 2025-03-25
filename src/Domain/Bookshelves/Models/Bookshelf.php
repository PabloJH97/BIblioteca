<?php

namespace Domain\Bookshelves\Models;

use Database\Factories\BookshelfFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
