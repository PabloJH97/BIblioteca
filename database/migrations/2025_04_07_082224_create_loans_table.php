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
        Schema::create('loans', function (Blueprint $table) {
            $table->uuid('id')->unique()->primary();
            $table->foreignUuid('book_id')->constrained(table:'books', indexName:'loan_id_book')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained(table:'users', indexName:'loan_id_user')->cascadeOnDelete();
            $table->boolean('borrowed')->default(true);
            $table->boolean('is_overdue')->default(false);
            $table->timestamps();
            $table->date('return_date');
            $table->date('returned_date')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
