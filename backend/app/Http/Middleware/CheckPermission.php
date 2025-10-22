<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     * 
     * @param string $permission - The required permission name
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if (!auth()->user()->hasPermission($permission)) {
            return response()->json([
                'message' => 'You do not have permission to perform this action'
            ], 403);
        }

        return $next($request);
    }
}