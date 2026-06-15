<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Customer/Menu', [
            'menus' => [],
            'categories' => [],
            'isSkeleton' => true,
        ]);
    }

    public function show(string $slug): Response
    {
        return Inertia::render('Customer/MenuDetail', [
            'menu' => null,
            'slug' => $slug,
            'isSkeleton' => true,
        ]);
    }
}
