<?php

namespace App\Repository\Home;

use App\Interfaces\Home\HomeRepositoryInterface;
use App\Models\User;

class HomeRepository implements HomeRepositoryInterface
{
    public function getNotifications($request)
    {
        $user = User::where('name', '=', $request->user)->first();

        return $user->unreadNotifications;
    }

    public function markAsRead($request)
    {
        $user = User::where('name', '=', $request->user)->first();

        $userUnreadNotification = $user->unreadNotifications;

        if ($userUnreadNotification) {
            $userUnreadNotification->markAsRead();
            return "Done";
        }
    }
}
