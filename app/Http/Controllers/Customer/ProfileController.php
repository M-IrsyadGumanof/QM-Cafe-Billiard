<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Customer/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail
                && ! $request->user()->hasVerifiedEmail(),
            'status' => session('status'),
        ]);
    }
}
