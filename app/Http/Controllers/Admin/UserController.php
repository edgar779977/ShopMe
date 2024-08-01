<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{

    public function __construct(protected UserService $userServices)
    {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get the search query and pagination parameters
        $search = $request->input('search');
        $perPage = $request->input('perPage', 10); // Default to 10 per page

        // Fetch users using the service
        $users = $this->userServices->getUsers($search, $perPage);

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegistrationRequest $request)
    {
        $data = $request->only(['name', 'email', 'password']);
        $result = $this->userServices->createUser($data);

        return response()->json([
            'success' => 1,
            'message' => 'the user has been successfully created',
            'user' => $result,

        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Perform user deletion logic
            User::destroy($id);

            // Retrieve updated list of users and sort by role
            $users = User::orderBy('role_id')->get();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully.',
                'users' => $users,
            ], 200); // Use 200 OK status code for successful response
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user.',
                'error' => $e->getMessage(),
            ], 500); // 500 Internal Server Error for failure
        }
    }

}
