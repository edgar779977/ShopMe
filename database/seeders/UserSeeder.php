<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{

    public function run()
    {
        // Create a user with a specific email
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'asdasdasdasd@gmail.com',
            'password' => bcrypt('123456789'),
        ]);


    }
}
