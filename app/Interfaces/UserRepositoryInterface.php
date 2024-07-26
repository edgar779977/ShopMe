<?php
namespace App\Interfaces;

interface UserRepositoryInterface
{
    public function getUsersByRole(string $role, array $exceptRoles = []);

    public function getUserById($userId);

    public function createUser(array $userDetails);

    public function updateUser($userId, array $newDetails);

    public function uploadProfileImage($userId, $imagePath);
}
