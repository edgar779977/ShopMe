<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\ProfileImage;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function getUsersByRole(string $role, array $exceptRoles = [], ?string $search = null, $perPage = 10): LengthAwarePaginator
    {
        $query = User::whereHas('roles', function ($query) use ($role) {
            $query->where('name', $role);
        })
            ->whereDoesntHave('roles', function ($query) use ($exceptRoles) {
                $query->whereIn('name', $exceptRoles);
            });

        // Apply search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Return paginated results
        return $query->paginate($perPage);
    }

    public function getUserById(int $userId): ?User
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

    public function updateUser(int $userId, array $newDetails): bool
    {
        return User::whereId($userId)->update($newDetails);
    }

    public function uploadProfileImage(int $userId, string $imagePath): ProfileImage
    {
        // Find or create profile image record
        return ProfileImage::updateOrCreate(
            ['user_id' => $userId],
            ['path' => $imagePath]
        );
    }

    public function login(array $credentials): JsonResponse
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
