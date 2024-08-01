<?php

namespace App\Interfaces;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    /**
     * Authenticate a user and return a token.
     *
     * @param array $credentials
     * @return JsonResponse
     */
    public function login(array $credentials): JsonResponse;

    /**
     * Retrieve users by role, excluding those with specified roles, with optional search and pagination.
     *
     * @param string $role
     * @param array $exceptRoles
     * @param string|null $search
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getUsersByRole(string $role, array $exceptRoles = [], ?string $search = null, $perPage = 10): LengthAwarePaginator;

    /**
     * Retrieve a user by their ID.
     *
     * @param int $userId
     * @return User|null
     */
    public function getUserById(int $userId): ?User;

    /**
     * Create a new user.
     *
     * @param array $userDetails
     * @return User|array
     */
    public function createUser(array $userDetails);

    /**
     * Update a user's details.
     *
     * @param int $userId
     * @param array $newDetails
     * @return bool
     */
    public function updateUser(int $userId, array $newDetails): bool;

    /**
     * Upload or update a user's profile image.
     *
     * @param int $userId
     * @param string $imagePath
     * @return \App\Models\ProfileImage
     */
    public function uploadProfileImage(int $userId, string $imagePath): \App\Models\ProfileImage;
}
