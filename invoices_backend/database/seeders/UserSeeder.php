<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $permissions = [
            'invoices',
            'invoices list',
            'paid invoices'
        ];
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }


        $user = User::create([
            'name' => 'nour',
            'email' => 'nour@gmail.com',
            'password' => bcrypt('123456'),
            'roles_name' => ['owner'],
            'status' => 'enabled'
        ]);
        $role = Role::create(['name' => 'owner']);
        $permissions = Permission::pluck('id', 'id')->all();
        $role->syncPermissions($permissions);
        $user->assignRole([$role->id]);
    }
}
