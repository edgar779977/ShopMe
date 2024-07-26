<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        // Ensure roles are eager loaded
        $user->load('roles');

        $is_admin = false;

        // Check each role of the user
        foreach ($user->roles as $role) {
            if ($role->name === 'admin') {
                $is_admin = true;
                break; // Exit the loop once admin role is found
            }
        }

        // If user is admin, proceed with the request
        if ($is_admin) {
            return $next($request);
        }

        // If the user doesn't have the admin role, abort with a 403 error
        abort(403, 'Unauthorized action.');
    }
}





