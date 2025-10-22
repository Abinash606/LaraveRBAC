<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Role;

class DashboardController extends Controller
{
    public function index()
    {
        $totalPosts = Post::count();
        $roles = Role::withCount('users')->get(['id', 'name']);


        return response()->json([
            'total_posts' => $totalPosts,
            'roles_summary' => $roles
        ]);
    }
}
