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
            'appointments.view',
            'appointments.create',
            'appointments.edit',  
            'access.schedules',
            'access.appointments',
            'access.pets',
            'pets.view',
            'pets.create',
            'pets.edit',
            'pets.delete',
            'services.view',
            'services.edit',
            'services.create',
            'access.history',
        ]);

        $manager->syncPermissions([
            'access.dashboard',
            'appointments.view',
            'appointments.edit',  
            'access.schedules',
            'access.appointments',
            'access.pets',
            'pets.view',
            'pets.edit',
            'access.history',

        ]);

        $employee->syncPermissions([
            'access.dashboard',
            'appointments.view',
            'appointments.edit',  
            'access.schedules',
            'access.appointments',
            'access.pets',
            'pets.view',
            'pets.edit',
            'access.history',

        ]);

        $employee->syncPermissions([
            'appointments.view',
            'appointments.create',
            'appointments.edit',
            'access.schedules',
            'access.appointments',
            'access.pets',
            'access.services',
            'pets.view',
            'pets.create',
            'pets.edit',
        ]);

        $this->command->info('Roles and permissions successfully seeded!');
    }
}
