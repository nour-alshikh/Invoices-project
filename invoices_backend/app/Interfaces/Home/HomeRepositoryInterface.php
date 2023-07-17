<?php

namespace App\Interfaces\Home;


interface HomeRepositoryInterface
{
    public function getNotifications($request);

    public function markAsRead($request);
}
