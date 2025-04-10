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
        Schema::create('books', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->string('title');
            $table->string('author');
            $table->integer('pages');
            $table->string('editorial');
            $table->string('ISBN');
            $table->string('genre')->references('name')->on('genres');
            $table->foreignUuid('bookshelf_id')->constrained(table:'bookshelves', indexName:'book_id_bookshelf')->cascadeOnDelete();
            $table->primary(['id', 'bookshelf_id']);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
