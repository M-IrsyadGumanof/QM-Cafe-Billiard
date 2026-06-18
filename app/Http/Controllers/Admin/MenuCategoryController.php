<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MenuCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/MenuCategories', [
            'categories' => MenuCategory::latest()->paginate(10),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $data['slug'] = Str::slug($data['name']).'-'.Str::random(4);

        MenuCategory::create($data);

        return back()->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function update(Request $request, MenuCategory $menuCategory): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $menuCategory->update($data);

        return back()->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(MenuCategory $menuCategory): RedirectResponse
    {
        if ($menuCategory->menus()->exists()) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki beberapa item menu didalamnya.');
        }

        $menuCategory->delete();

        return back()->with('success', 'Kategori berhasil dihapus.');
    }
}
