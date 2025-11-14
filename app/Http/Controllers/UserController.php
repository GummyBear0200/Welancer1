<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all()->map(fn($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames(), // Get assigned roles
            'created_at' => $user->created_at->toDateTimeString(),
            'updated_at' => $user->updated_at->toDateTimeString(),
        ]);

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        // Get all roles for dropdown
        $roles = Role::select('id', 'name')->get();

        return Inertia::render('Users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        // Hash the password
        $validated['password'] = Hash::make($validated['password']);

        // Create the user
        $user = User::create($validated);

        // Assign role
        $role = Role::find($validated['role_id']);
        if ($role) {
            $user->assignRole($role->name);
        }

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }
    public function show(User $user)
{
    // Get user's roles and permissions
    $roles = $user->roles->map(fn($role) => [
        'id' => $role->id,
        'name' => $role->name,
    ]);

    $permissions = $user->getAllPermissions()->map(fn($permission) => [
        'id' => $permission->id,
        'name' => $permission->name,
    ]);

    return Inertia::render('Users/Show', [
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at?->toDateTimeString(),
            'two_factor_confirmed_at' => $user->two_factor_confirmed_at?->toDateTimeString(),
            'created_at' => $user->created_at->toDateTimeString(),
            'updated_at' => $user->updated_at->toDateTimeString(),
            'roles' => $roles,
            'permissions' => $permissions,
        ],
    ]);
}
 public function edit(User $user)
    {
        $roles = Role::select('id', 'name')->get();
        $role_id = $user->roles()->first()?->id; // current role

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'role_id' => $role_id,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        // Update role
        $role = Role::find($request->role_id);
        $user->syncRoles([$role]);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }
    
    public function destroy(User $user) { $user->delete(); return redirect()->route('users.index')->with('success', 'User deleted successfully.'); } 
}
