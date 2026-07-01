<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $category = trim((string) $request->query('category', ''));

        $menus = Menu::with('category')
            ->where('status', 'available')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhereHas('category', function ($categoryQuery) use ($search) {
                            $categoryQuery->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($category !== '', function ($query) use ($category) {
                $query->whereHas('category', function ($categoryQuery) use ($category) {
                    $categoryQuery->where('slug', $category)
                        ->orWhere('name', $category);
                });
            })
            ->latest()
            ->get();

        return Inertia::render('Public/Menu', [
            'menus' => $menus,
            'categories' => MenuCategory::where('status', 'active')->orderBy('name')->get(),
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    public function show(Menu $menu): Response
    {
        abort_unless($menu->status === 'available', 404);

        return Inertia::render('Public/MenuDetail', ['menu' => $menu->load('category')]);
    }
}
