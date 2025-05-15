<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            UserSeeder::class,
            RoleSeeder::class,
            GenreSeeder::class,
            FloorSeeder::class,
            ZoneSeeder::class,
            BookshelfSeeder::class,
            BookSeeder::class,
            BookGenreSeeder::class,
            LoanSeeder::class,
        ]);

        //migrar pulse database

    }
}
