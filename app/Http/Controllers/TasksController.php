<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TasksController extends Controller
{
    /**
     * Display a listing of tasks.
     */
    public function index()
    {
        $tasks = Task::all();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'flash' => session('flash'),
        ]);
    }

    /**
     * Show the form for creating a new task.
     */
    public function create()
    {
        $projects = Project::all();
        $users = User::all();

        return Inertia::render('Tasks/Create', [
            'projects' => $projects,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed,overdue',
            'priority' => 'required|in:low,medium,high,urgent',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'estimated_hours' => 'nullable|integer|min:0',
            'actual_hours' => 'nullable|integer|min:0',
            'quality_score' => 'nullable|numeric|min:0|max:100',
        ]);

        $validated['created_by'] = auth()->id();

        Task::create($validated);

        // Inertia-compatible redirect
        return Inertia::location(route('tasks.index'));
    }

    /**
     * Show the form for editing the specified task.
     */
    public function edit(Task $task)
    {
        $projects = Project::all();
        $users = User::all();

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'projects' => $projects,
            'users' => $users,
            'flash' => session('flash'),
        ]);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed,overdue',
            'priority' => 'required|in:low,medium,high,urgent',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'completed_date' => 'nullable|date',
            'estimated_hours' => 'nullable|integer|min:0',
            'actual_hours' => 'nullable|integer|min:0',
            'quality_score' => 'nullable|numeric|min:0|max:100',
        ]);

        $task->update($validated);

        // Inertia-compatible redirect after update
        return Inertia::location(route('tasks.index'));
    }




public function leaderboard()
{
    $users = User::with('tasks')->get()->map(function($user) {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'tasks_count' => $user->tasks->count(),
            'total_score' => $user->tasks->sum('quality_score') ?? 0,
        ];
    });

    return Inertia::render('Leaderboard', [
        'users' => $users->toArray(), // <-- convert collection to plain array
    ]);
}



    /**
     * Remove the specified task from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return Inertia::location(route('tasks.index'));
    }
}
