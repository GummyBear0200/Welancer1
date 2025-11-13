<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();

        return Inertia::render('Permissions/Index', [
            'permissions' => $permissions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Permissions/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        Permission::create($validated);

        return redirect()->route('permissions.index')
                         ->with('success', 'Permission created successfully!');
    }

    // NEW: Show single permission
    public function show(string $id)
    {
        $permission = Permission::findOrFail($id);

        return Inertia::render('Permissions/Show', [
            'permission' => $permission,
        ]);
    }

    public function edit(string $id)
    {
        $permission = Permission::findOrFail($id);

        return Inertia::render('Permissions/Edit', [
            'permission' => $permission,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $permission = Permission::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $id,
        ]);

        $permission->update($validated);

        return redirect()->route('permissions.index')
                         ->with('success', 'Permission updated successfully!');
    }

    public function destroy(string $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return redirect()->route('permissions.index')
                         ->with('success', 'Permission deleted successfully!');
    }
}