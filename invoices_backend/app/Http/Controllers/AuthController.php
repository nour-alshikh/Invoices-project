<?php

namespace App\Http\Controllers;

use App\Interfaces\User\UserRepositoryInterface;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    private $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(Request $request)
    {
        return $this->userRepository->register($request);
    }

    public function login(Request $request)
    {
        return $this->userRepository->login($request);
    }

    public function logout()
    {
        return $this->userRepository->logout();
    }
}
