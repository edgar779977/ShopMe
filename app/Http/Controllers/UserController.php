<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get the authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getUser(Request $request)
    {

        $users = [];
        $usersWithRoles = User::with('roles')->get();

        foreach ($usersWithRoles as $user) {
            if ($user->roles->isEmpty()) {
                $users[] = $user;
            }
        }



        return response()->json($users);
    }
}
