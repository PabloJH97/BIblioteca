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
        Schema::create('bookshelves', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->integer('number');
            $table->integer('capacity');
            $table->foreignUuid('zone_id')->constrained(table:'zones', indexName:'bookshelf_id_zone')->cascadeOnDelete();
            $table->primary(['id', 'number', 'zone_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookshelves');
    }
};
