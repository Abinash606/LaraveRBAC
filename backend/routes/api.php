<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DashboardController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard.index');
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/posts', [PostController::class, 'index'])
        ->middleware('permission:view_posts')
        ->name('posts.index');

    Route::post('/posts', [PostController::class, 'store'])
        ->middleware('permission:add_post')
        ->name('posts.store');

    Route::put('/posts/{id}', [PostController::class, 'update'])
        ->middleware('permission:edit_post')
        ->name('posts.update');

    Route::delete('/posts/{id}', [PostController::class, 'destroy'])
        ->middleware('permission:delete_post')
        ->name('posts.destroy');

    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');
});
