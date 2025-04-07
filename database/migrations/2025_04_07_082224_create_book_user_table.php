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
        Schema::create('book_user', function (Blueprint $table) {
            $table->foreignUuid('book_id');
            $table->foreignUuid('user_id');
            $table->boolean('borrowed');
            $table->date('lended_date');
            $table->date('returned_date');
            $table->primary(['book_id', 'user_id', 'borrow_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_user');
    }
};
