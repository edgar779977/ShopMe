<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Insert admin user
        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'alaverdyan.edo70@gmail.com',
            'password' => Hash::make('admin123'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);



        DB::table('user_role')->insert([
            'user_id' => 14,
            'role_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
