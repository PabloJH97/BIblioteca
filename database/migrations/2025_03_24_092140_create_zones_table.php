<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('zones', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->foreignUuid('genre_id')->constrained(table:'genres', indexName:'zone_id_genre')->cascadeOnDelete();
            $table->string('name')->references('name')->on('genres');
            $table->foreignUuid('floor_id')->constrained(table:'floors', indexName:'zone_id_floor')->cascadeOnDelete();
            $table->string('floor')->references('name')->on('floors');
            $table->timestamps();
            $table->primary(['name', 'floor']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zones');
    }
};
