<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::with(['creator', 'tasks'])->latest()->get();
        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function edit(Project $project): Response
    {
        $project->load(['creator', 'tasks']);
        return Inertia::render('Projects/Edit', [
            'project' => $project
        ]);
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'created_by' => 'required|exists:users,id',
            'status' => 'required|in:pending,in_progress,completed,on_hold',
            'priority' => 'required|in:low,medium,high,urgent',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date|after_or_equal:start_date',
            'completed_date' => 'nullable|date',
            'progress' => 'required|numeric|min:0|max:100',
        ]);

        Project::create($validated);
        return Inertia::location(route('projects.index'));
    }

public function update(Request $request, Project $project): \Illuminate\Http\RedirectResponse
{
    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'sometimes|required|in:pending,in_progress,completed,on_hold',
        'priority' => 'sometimes|required|in:low,medium,high,urgent',
        'start_date' => 'nullable|date',
        'due_date' => 'nullable|date|after_or_equal:start_date',
        'completed_date' => 'nullable|date',
        'progress' => 'sometimes|required|numeric|min:0|max:100',
    ]);

    $project->update($validated);

    return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
}


    public function destroy(Project $project): Response
    {
        $project->delete();
        return Inertia::location(route('projects.index'));
    }
}
