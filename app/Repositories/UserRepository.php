<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\ProfileImage;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Retrieve users by role, excluding those with specified roles.
     *
     * @param string $role
     * @param array $exceptRoles
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUsersByRole(string $role, array $exceptRoles = [])
    {
        return User::whereHas('roles', function ($query) use ($role) {
            $query->where('name', $role);
        })
            ->whereDoesntHave('roles', function ($query) use ($exceptRoles) {
                $query->whereIn('name', $exceptRoles);
            })
            ->get();
    }

    /**
     * Retrieve a user by their ID.
     *
     * @param int $userId
     * @return \App\Models\User|null
     */
    public function getUserById(int $userId)
    {
        return User::find($userId);
    }

    /**
     * Create a new user.
     *
     * @param array $userDetails
     * @return \App\Models\User|array
     */
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

    /**
     * Update a user's details.
     *
     * @param int $userId
     * @param array $newDetails
     * @return bool
     */
    public function updateUser(int $userId, array $newDetails)
    {
        return User::whereId($userId)->update($newDetails);
    }

    /**
     * Upload or update a user's profile image.
     *
     * @param int $userId
     * @param string $imagePath
     * @return \App\Models\ProfileImage
     */
    public function uploadProfileImage(int $userId, string $imagePath)
    {
        // Find or create profile image record
        return ProfileImage::updateOrCreate(
            ['user_id' => $userId],
            ['path' => $imagePath]
        );
    }

    /**
     * Authenticate a user and return a token.
     *
     * @param array $credentials
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(array $credentials)
    {

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            $isAdmin = $user->roles()->where('name', 'admin')->exists();

            return response()->json([
                'user' => $user,
                'token' => $token,
                'isAdmin' => $isAdmin,
            ]);
        }

        return response()->json([
            'message' => 'Invalid email or password',
        ], 401);
    }
}
