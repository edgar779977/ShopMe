<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = User::all();
        foreach ($users as $user) {
            $user->roles()->attach(User::ROLE_USER);
        }
    }
}
