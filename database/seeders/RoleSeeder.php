<?php

namespace Database\Seeders;

use Domain\Roles\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(attributes: [
            'name' => 'admin',
            'display_name' => 'Administrador',
            'description' => 'Administrador de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
        $admin->givePermissionTo([
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'reports.view',
            'reports.export',
            'reports.print',
            'config.access',
            'config.modify',
        ]);

        $client = Role::create(attributes: [
            'name' => 'client',
            'display_name' => 'Cliente',
            'description' => 'Cliente de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);

        $client->givePermissionTo([
            'products.view',
            'reports.view',
            'config.access',
            'config.modify',
        ]);
    }
}
