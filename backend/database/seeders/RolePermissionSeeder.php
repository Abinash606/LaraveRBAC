<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;
use App\Models\User;
use App\Models\Post;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {

        $viewPosts = Permission::create(['name' => 'view_posts']);
        $addPosts = Permission::create(['name' => 'add_post']);
        $editPosts = Permission::create(['name' => 'edit_post']);
        $deletePosts = Permission::create(['name' => 'delete_post']);

        $admin = Role::create(['name' => 'Admin']);
        $editor = Role::create(['name' => 'Editor']);
        $viewer = Role::create(['name' => 'Viewer']);


        $admin->permissions()->attach([$viewPosts->id, $addPosts->id, $editPosts->id, $deletePosts->id]);
        $editor->permissions()->attach([$viewPosts->id, $addPosts->id, $editPosts->id]);
        $viewer->permissions()->attach($viewPosts->id);


        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123')
        ]);
        $adminUser->roles()->attach($admin->id);

        $editorUser = User::create([
            'name' => 'Editor User',
            'email' => 'editor@example.com',
            'password' => Hash::make('password123')
        ]);
        $editorUser->roles()->attach($editor->id);

        $viewerUser = User::create([
            'name' => 'Viewer User',
            'email' => 'viewer@example.com',
            'password' => Hash::make('password123')
        ]);
        $viewerUser->roles()->attach($viewer->id);

        Post::create([
            'title' => 'Welcome Post by Admin',
            'content' => 'This is the first post created by Admin.',
            'user_id' => $adminUser->id,
        ]);

        Post::create([
            'title' => 'Editor Sample Post',
            'content' => 'This post was created by the Editor.',
            'user_id' => $editorUser->id,
        ]);

        Post::create([
            'title' => 'Viewer Sample Post',
            'content' => 'This is a post assigned to Viewer (read-only).',
            'user_id' => $viewerUser->id,
        ]);

        echo "Roles, Users, Permissions, and Sample Posts seeded successfully!\n";
        echo "Admin: admin@example.com / password123\n";
        echo "Editor: editor@example.com / password123\n";
        echo "Viewer: viewer@example.com / password123\n";
    }
}
