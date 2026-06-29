<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BilliardPackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BilliardPackageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/BilliardPackages', [
            'packages' => BilliardPackage::orderBy('type')->paginate(10),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:regular,personal',
            'duration_minutes' => 'required_if:type,regular|nullable|integer|min:1',
            'price' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        if ($data['type'] === 'personal') {
            $data['duration_minutes'] = null;
        }

        BilliardPackage::create($data);

        return back()->with('success', 'Paket billiard berhasil ditambahkan.');
    }

    public function update(Request $request, BilliardPackage $billiardPackage): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:regular,personal',
            'duration_minutes' => 'required_if:type,regular|nullable|integer|min:1',
            'price' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        if ($data['type'] === 'personal') {
            $data['duration_minutes'] = null;
        }

        $billiardPackage->update($data);

        return back()->with('success', 'Paket billiard berhasil diperbarui.');
    }

    public function destroy(BilliardPackage $billiardPackage): RedirectResponse
    {
        if ($billiardPackage->reservations()->exists()) {
            return back()->with('error', 'Paket tidak dapat dihapus karena memiliki riwayat reservasi pelanggan.');
        }

        $billiardPackage->delete();

        return back()->with('success', 'Paket billiard berhasil dihapus.');
    }
}
