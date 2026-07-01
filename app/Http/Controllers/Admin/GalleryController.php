<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display a listing of the gallery items.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Gallery', [
            'galleries' => Gallery::latest()->paginate(12),
        ]);
    }

    /**
     * Store a newly created gallery item in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|max:2048',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('gallery', 'public');
        }

        Gallery::create($data);

        return back()->with('success', 'Foto galeri berhasil ditambahkan.');
    }

    /**
     * Update the specified gallery item in storage.
     */
    public function update(Request $request, Gallery $gallery): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        if ($request->boolean('delete_image')) {
            if ($gallery->image) {
                Storage::disk('public')->delete($gallery->image);
            }
            $data['image'] = null;
        } elseif ($request->hasFile('image')) {
            // Delete old image file if it exists
            if ($gallery->image) {
                Storage::disk('public')->delete($gallery->image);
            }
            $data['image'] = $request->file('image')->store('gallery', 'public');
        } else {
            unset($data['image']);
        }

        $gallery->update($data);

        return back()->with('success', 'Foto galeri berhasil diperbarui.');
    }

    /**
     * Remove the specified gallery item from storage.
     */
    public function destroy(Gallery $gallery): RedirectResponse
    {
        if ($gallery->image) {
            Storage::disk('public')->delete($gallery->image);
        }

        $gallery->delete();

        return back()->with('success', 'Foto galeri berhasil dihapus.');
    }
}
