<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\ProfileImage;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{

    public function getUsersByRole(string $role, array $exceptRoles = [])
    {
        // Retrieve users with the 'user' role and exclude those with the 'admin' role
        return User::whereHas('roles', function($query) use ($role){
            $query->where('name', $role);
        })
        ->whereDoesntHave('roles', function($query) use ($exceptRoles){
            $query->whereIn('name', $exceptRoles);
        })
        ->get();
    }

    public function getUserById($userId)
    {
        return User::find($userId);
    }

    public function createUser(array $userDetails)
    {
        $user = User::create([
            'name' => $userDetails['name'],
            'email' => $userDetails['email'],
            'password' => Hash::make($userDetails['password']),
        ]);

        $defaultRole = Role::where('name', 'user')->first();

        if ($defaultRole) {
            $user->roles()->attach($defaultRole->id);
        } else {
            return ['error' => 'Default role not found'];
        }

        return $user;
    }

    public function updateUser($userId, $newDetails)
    {
        return User::whereId($userId)->update($newDetails);

    }

    public function uploadProfileImage($userId, $imagePath)
    {
        // Find or create profile image record
        $profileImage = ProfileImage::updateOrCreate(
            ['user_id' => $userId],
            ['path' => $imagePath]
        );

        return $profileImage;
    }


}
