<?php

namespace App\Services;

use App\Jobs\SendWelcomeEmailJob;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function __construct(protected UserRepository $userRepository)
    {
    }

    public function getUserUsers()
    {
        return $this->userRepository->getUsersByRole('user', ['admin']);
    }

    public function getAdminUser()
    {
        return $this->userRepository->getUsersByRole('admin', ['user']);
    }


    public function createUser(array $data)
    {
        $user = $this->userRepository->createUser($data);

        if (isset($user['error'])) {
            return ['success' => 0, 'message' => $user['error']];
        }

        // Send welcome email
        SendWelcomeEmailJob::dispatch($user);

        return $user;
    }

    public function uploadProfileImage($userId, $imagePath)
    {
        return $this->userRepository->uploadProfileImage($userId, $imagePath);
    }

    public function login(array $user)
    {

        return $this->userRepository->login($user);
    }
}
