<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        // Get all users with count of completed tasks
        $users = User::withCount(['tasks as tasks_count' => function ($query) {
                $query->where('status', 'completed'); // Only completed tasks
            }])
            ->withSum(['tasks as total_score' => function ($query) {
                $query->where('status', 'completed'); // Only completed tasks
            }], 'quality_score') // Sum the quality_score of completed tasks
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'tasks_count' => $user->tasks_count,
                    'total_score' => $user->total_score ?? 0,
                ];
            });

        return Inertia::render('Leaderboard', [
            'users' => $users->sortByDesc('total_score')->values(), // Sort by total_score descending
        ]);
    }
}

