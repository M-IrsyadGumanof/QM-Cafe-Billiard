<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Admin/Menu', [
            'menus' => Menu::with('category')
                ->when($request->search, function ($q, $v) {
                    $q->where('name', 'like', "%$v%");
                })
                ->when($request->status, function ($q, $v) {
                    $q->where('status', $v);
                })
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'categories' => MenuCategory::orderBy('name')->get(),
            'filters' => $request->only('search', 'status')
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'menu_category_id' => 'required|exists:menu_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            'status' => 'required|in:available,unavailable',
            'image' => 'nullable|image|max:2048'
        ]);

        $data['slug'] = Str::slug($data['name']) . '-' . Str::random(4);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('menu', 'public');
        }

        Menu::create($data);

        return back()->with('success', 'Menu berhasil ditambahkan.');
    }

    public function update(Request $request, Menu $menu): RedirectResponse
    {
        $data = $request->validate([
            'menu_category_id' => 'required|exists:menu_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            'status' => 'required|in:available,unavailable',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('menu', 'public');
        }

        $menu->update($data);

        return back()->with('success', 'Menu berhasil diperbarui.');
    }

    public function destroy(Menu $menu): RedirectResponse
    {
        if ($menu->orderItems()->exists()) {
            return back()->with('error', 'Menu tidak dapat dihapus karena pernah dipesan oleh pelanggan.');
        }

        $menu->delete();

        return back()->with('success', 'Menu berhasil dihapus.');
    }
}
