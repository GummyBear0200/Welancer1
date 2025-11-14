<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Task;
use App\Models\Project;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Stats
        $stats = [
            'totalUsers' => User::count(),
            'tasksCompleted' => Task::where('status', 'completed')->count(),
            'totalProjects' => Project::count(),
        ];

        // Leaderboard
        $leaderboard = User::withCount('tasks')
            ->get()
            ->map(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'tasks_count' => $user->tasks_count,
                'total_score' => $user->tasks_count * 10, // Example score formula
            ]);

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'leaderboard' => $leaderboard,
        ]);
    }
}

