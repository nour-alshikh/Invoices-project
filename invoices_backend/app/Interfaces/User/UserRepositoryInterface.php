<?php

namespace App\Interfaces\User;

interface UserRepositoryInterface
{
    public function register($request);
    public function login($request);
    public function logout();
}
