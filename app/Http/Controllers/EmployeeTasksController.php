<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class EmployeeTasksController extends Controller
{
    public function index()
{
    $tasks = auth()->user()->tasks()->get();
    return Inertia::render('EmployeeTask', [
        'tasks' => $tasks,
    ]);
}
 

    public function updateStatus(Request $request, Task $task)
    {
        $this->authorize('update', $task); // Make sure only assigned user can update

        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,completed,on_hold,overdue',
        ]);

        $task->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Task status updated!');
    }

    
}
