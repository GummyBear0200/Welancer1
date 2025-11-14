<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LeaderboardController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', fn() => Inertia::render('Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
]))->name('home');

/*
|--------------------------------------------------------------------------
| Authenticated + Verified Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

    // Resource Routes
    Route::resource('users', UserController::class)->except(['show'])->names('users');
  Route::resource('roles', RolesController::class);

    Route::resource('permissions', PermissionController::class)->except(['show'])->names('permissions');
    Route::resource('tasks', TasksController::class)->names('tasks');
    Route::resource('projects', ProjectController::class)->names('projects');
   Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');

    

});

/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';
