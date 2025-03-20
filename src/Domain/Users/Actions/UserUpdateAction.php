<?php

namespace Domain\Users\Actions;

use Domain\Users\Data\Resources\UserResource;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Hash;

class UserUpdateAction
{
    public function __invoke(User $user, array $data, array $permissions): UserResource
    {
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }
        $user->permissions()->detach();
        $user->givePermissionTo($permissions);
        $user->update($updateData);

        return UserResource::fromModel($user->fresh());
    }
}
