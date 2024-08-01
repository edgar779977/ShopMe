<?php

namespace App\Services;

use App\Jobs\SendWelcomeEmailJob;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;

class UserService
{
    public function __construct(protected UserRepository $userRepository)
    {
    }

    /**
     * Get users with the 'user' role, with optional search and pagination.
     *
     * @param string|null $search
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getUsers(?string $search = null, int $perPage = 10): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->userRepository->getUsersByRole('user', ['admin'], $search, $perPage);
    }

    /**
     * Get users with the 'user' role, with optional search and pagination.
     *
     * @param string|null $search
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getAdmins(?string $search = null, int $perPage = 10): \Illuminate\Pagination\LengthAwarePaginator
    {
        return $this->userRepository->getUsersByRole('admin', ['user']);
    }

    // Other methods...

    /**
     * Create a new user and dispatch a welcome email.
     *
     * @param array $data
     * @return User|array
     */
    public function createUser(array $data)
    {
        $result = $this->userRepository->createUser($data);

        if (isset($result['error'])) {
            return ['error' => $result['error']];
        }

        $user = $result; // Assume $result is a User model instance
        // Dispatch welcome email job
        SendWelcomeEmailJob::dispatch($user);

        return $user;
    }

    /**
     * Upload a profile image for a user.
     *
     * @param int $userId
     * @param string $imagePath
     * @return \App\Models\ProfileImage
     */
    public function uploadProfileImage(int $userId, string $imagePath): \App\Models\ProfileImage
    {
        return $this->userRepository->uploadProfileImage($userId, $imagePath);
    }

    /**
     * Authenticate a user and return their token.
     *
     * @param array $credentials
     * @return JsonResponse
     */
    public function login(array $credentials): JsonResponse
    {
        $response = $this->userRepository->login($credentials);

        // Return the JsonResponse directly
        return $response;
    }
}
