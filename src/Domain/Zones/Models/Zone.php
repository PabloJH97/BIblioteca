<?php

namespace Domain\Zones\Models;

use Database\Factories\ZoneFactory;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Zone extends Model
{
    use HasFactory, HasUuids;
    use HasFactory, HasUuids;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return ZoneFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'floor_id',
        'floor',
    ];

    public function bookshelves(): HasMany
    {
        return $this->hasMany(Bookshelf::class, 'user_id');
    }

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class, 'floor_id');
    }
}
