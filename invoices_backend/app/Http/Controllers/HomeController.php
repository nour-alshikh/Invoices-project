<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notification;

class HomeController extends Controller
{
    public function getNotifications(Request $request)
    {
        $user = User::where('name', '=', $request->user)->first();

        return $user->unreadNotifications;
    }

    public function markAsRead(Request $request)
    {
        $user = User::where('name', '=', $request->user)->first();

        $userUnreadNotification = $user->unreadNotifications;

        if ($userUnreadNotification) {
            $userUnreadNotification->markAsRead();
            return "Done";
        }
    }
}
