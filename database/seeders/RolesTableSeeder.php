<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Insert admin role
        DB::table('roles')->insert([
            'id' => 1,
            'name' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Insert user role
        DB::table('roles')->insert([
            'id' => 2,
            'name' => 'user',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
