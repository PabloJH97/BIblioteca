<?php

namespace Database\Seeders;

use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Zone::factory(Genre::all()->count())->create();
    }
}
