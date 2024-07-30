<?php


namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function __construct(protected UserService $userServices){}

    public function login(LoginRequest $request)
    {
        return $this->userServices->login($request->all());
    }

    public function register(RegistrationRequest $request)
    {

        $user = $this->userServices->createUser($request->all());
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token

            ],200);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
