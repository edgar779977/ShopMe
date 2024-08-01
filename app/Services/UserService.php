<?php

namespace App\Services;

use App\Jobs\SendWelcomeEmailJob;
use App\Repositories\UserRepository;
use Illuminate\Support\Collection;

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

    /**
     * Create a new user and dispatch a welcome email.
     *
     * @param array $data
     * @return array
     */
    public function createUser(array $data): array
    {
        $user = $this->userRepository->createUser($data);

        if (isset($user['error'])) {
            return ['success' => false, 'message' => $user['error']];
        }

        // Dispatch welcome email job
        SendWelcomeEmailJob::dispatch($user);

        return ['success' => true, 'user' => $user];
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
     * @return array
     */
    public function login(array $credentials): array
    {
        $response = $this->userRepository->login($credentials);

        // Adjust response structure if necessary
        if ($response->status() === 200) {
            return [
                'success' => true,
                'user' => $response->json('user'),
                'token' => $response->json('token'),
                'isAdmin' => $response->json('isAdmin'),
            ];
        }

        return [
            'success' => false,
            'message' => $response->json('message'),
        ];
    }
}
