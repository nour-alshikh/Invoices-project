<?php

namespace App\Http\Controllers;

use App\Interfaces\Home\HomeRepositoryInterface;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    private $home;

    public function __construct(HomeRepositoryInterface $home)
    {
        $this->home = $home;
    }
    public function getNotifications(Request $request)
    {
        return $this->home->getNotifications($request);
    }

    public function markAsRead(Request $request)
    {
        return $this->home->markAsRead($request);
    }
}
