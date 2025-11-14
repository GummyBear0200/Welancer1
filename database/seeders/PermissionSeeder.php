<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',
            'access.dashboard',
            'tasks.edit',
            'tasks.create',
            'tasks.delete',  
            'access.tasks',
            'access.projects',           
            'projects.view',
            'projects.create',
            'projects.edit',
            'projects.delete',
            'access.leaderboards',
            'task.view',
            

        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}