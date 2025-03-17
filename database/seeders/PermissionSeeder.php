<?php

namespace Database\Seeders;

use Domain\Permissions\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $user_permission = Permission::create(attributes: [
            'name' => 'users.view',
            'display_name' => 'Ver Usuarios',
            'description' => 'Ver lista de Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'users.create',
            'display_name' => 'Crear Usuarios',
            'description' => 'Crear Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'users.edit',
            'display_name' => 'Editar Usuarios',
            'description' => 'Editar Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'users.delete',
            'display_name' => 'Eliminar Usuarios',
            'description' => 'Eliminar Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        $product_permission = Permission::create(attributes: [
            'name' => 'products.view',
            'display_name' => 'Ver Productos',
            'description' => 'Ver lista de Productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'products.create',
            'display_name' => 'Crear Productos',
            'description' => 'Crear Productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $product_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'products.edit',
            'display_name' => 'Editar Productos',
            'description' => 'Editar Productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $product_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'products.delete',
            'display_name' => 'Eliminar Productos',
            'description' => 'Eliminar Productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $product_permission->id,
        ]);

        $report_permission = Permission::create(attributes: [
            'name' => 'reports.view',
            'display_name' => 'Ver Reportes',
            'description' => 'Ver lista de Reportes de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'reports.export',
            'display_name' => 'Exportar reportes',
            'description' => 'Exportar Reportes de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $report_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'reports.print',
            'display_name' => 'Imprimir reportes',
            'description' => 'Imprimir Reportes de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $report_permission->id,
        ]);

        $config_permission = Permission::create(attributes: [
            'name' => 'config.access',
            'display_name' => 'Acceder a Configuración',
            'description' => 'Acceder a la configuración de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'config.modify',
            'display_name' => 'Modificar Configuración',
            'description' => 'Modificar la Configuración de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $config_permission->id,
        ]);


        Cache::forever(key: 'permissions', value: Permission::whereNull('parent_id')->with('children')->get());
    }
}
