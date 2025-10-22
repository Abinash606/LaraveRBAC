<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::whereNull('deleted_at')->with('user')->get();
        return response()->json($posts);
    }

    public function store(StorePostRequest $request)
    {
        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ], 201);
    }

    public function update(StorePostRequest $request, $id)
    {
        $post = Post::withTrashed()->findOrFail($id);
        $post->update($request->only('title', 'content'));
        $post->update($request->validated());

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post
        ]);
    }

    public function destroy($id)
    {
        $post = Post::withTrashed()->findOrFail($id);
        if ($post->trashed()) {
            $post->forceDelete();
        } else {
            $post->delete();
        }

        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function restore($id)
    {
        $post = Post::withTrashed()->findOrFail($id);
        $post->restore();

        return response()->json(['message' => 'Post restored successfully']);
    }
}
