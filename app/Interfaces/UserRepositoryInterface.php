<?php

namespace App\Interfaces;

interface UserRepositoryInterface
{
    /**
     * Authenticate a user and return a token.
     *
     * @param array $credentials
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(array $credentials);

    /**
     * Retrieve users by role, excluding those with specified roles.
     *
     * @param string $role
     * @param array $exceptRoles
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUsersByRole(string $role, array $exceptRoles = []);

    /**
     * Retrieve a user by their ID.
     *
     * @param int $userId
     * @return \App\Models\User|null
     */
    public function getUserById(int $userId);

    /**
     * Create a new user.
     *
     * @param array $userDetails
     * @return \App\Models\User|array
     */
    public function createUser(array $userDetails);

    /**
     * Update a user's details.
     *
     * @param int $userId
     * @param array $newDetails
     * @return bool
     */
    public function updateUser(int $userId, array $newDetails);

    /**
     * Upload or update a user's profile image.
     *
     * @param int $userId
     * @param string $imagePath
     * @return \App\Models\ProfileImage
     */
    public function uploadProfileImage(int $userId, string $imagePath);
}
