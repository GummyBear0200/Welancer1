<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear cached roles/permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Get all existing permissions (make sure PermissionSeeder runs first)
        $permissions = Permission::all();

        // Create roles if they don't exist
        $admin = Role::firstOrCreate(['name' => 'System Administrator']);
        $hr = Role::firstOrCreate(['name' => 'HR']);
        $manager = Role::firstOrCreate(['name' => 'Manager']);
        $employee = Role::firstOrCreate(['name' => 'Employee']);
        

        // Assign permissions to Admin (all permissions)
        $admin->syncPermissions($permissions);

        // Assign limited permissions to Staff
        $hr->syncPermissions([
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
            
            'tasks.edit',
            'tasks.create',
            
        ]);

        $manager->syncPermissions([
            'access.dashboard',
            'projects.view',
            'projects.edit',  
            'access.projects',
            'access.tasks',
            'projects.delete',     
            'tasks.edit',
            

        ]);

        $employee->syncPermissions([
            'access.dashboard',
            'tasks.edit',  
            'access.leaderboard'
            
           
            
            
            

        ]);

     

        $this->command->info('Roles and permissions successfully seeded!');
    }
}
