<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BilliardTable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BilliardTableController extends Controller
{
    public function index()
    {
        $tables = BilliardTable::orderBy('table_number')->paginate(12);

        return Inertia::render('Admin/BilliardTables', [
            'tables' => $tables,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_number' => 'required|string|unique:billiard_tables,table_number',
            'name' => 'required|string|max:255',
            'status' => 'required|in:available,reserved,occupied,maintenance',
            'description' => 'nullable|string',
        ]);

        BilliardTable::create($validated);

        return back()->with('success', 'Meja berhasil ditambahkan.');
    }

    public function update(Request $request, BilliardTable $billiardTable)
    {
        $validated = $request->validate([
            'table_number' => 'required|string|unique:billiard_tables,table_number,' . $billiardTable->id,
            'name' => 'required|string|max:255',
            'status' => 'required|in:available,reserved,occupied,maintenance',
            'description' => 'nullable|string',
        ]);

        $billiardTable->update($validated);

        return back()->with('success', 'Meja berhasil diupdate.');
    }

    public function destroy(BilliardTable $billiardTable)
    {
        if ($billiardTable->reservations()->exists()) {
            return back()->withErrors(['error' => 'Meja tidak dapat dihapus karena memiliki riwayat reservasi.']);
        }

        $billiardTable->delete();

        return back()->with('success', 'Meja berhasil dihapus.');
    }

    public function schedule()
    {
        $tables = BilliardTable::with(['reservations.user'])
            ->orderBy('table_number')
            ->get();

        return Inertia::render('Admin/TableSchedule', [
            'tables' => $tables,
        ]);
    }
}