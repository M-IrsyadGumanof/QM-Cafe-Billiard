<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Customer/Menu', [
            'menus' => Menu::with('category')->where('status', 'available')->latest()->get(),
            'categories' => MenuCategory::where('status', 'active')->orderBy('name')->get(),
        ]);
    }

    public function show(Menu $menu): Response
    {
        abort_unless($menu->status === 'available', 404);

        return Inertia::render('Customer/MenuDetail', ['menu' => $menu->load('category')]);
    }
}
