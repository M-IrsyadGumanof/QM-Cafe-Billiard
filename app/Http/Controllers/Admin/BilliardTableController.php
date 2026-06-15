<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\BilliardTable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
class BilliardTableController extends Controller { public function index(): Response { return Inertia::render('Admin/BilliardTables',['tables'=>BilliardTable::orderBy('table_number')->paginate(12)]); } public function store(Request $request): RedirectResponse { $data=$request->validate(['table_number'=>'required|string|max:50|unique:billiard_tables,table_number','name'=>'required|string|max:255','status'=>'required|in:available,reserved,occupied,maintenance','description'=>'nullable|string']); BilliardTable::create($data); return back()->with('success','Meja billiard berhasil ditambahkan.'); } public function update(Request $request, BilliardTable $billiardTable): RedirectResponse { $data=$request->validate(['table_number'=>'required|string|max:50|unique:billiard_tables,table_number,'.$billiardTable->id,'name'=>'required|string|max:255','status'=>'required|in:available,reserved,occupied,maintenance','description'=>'nullable|string']); $billiardTable->update($data); return back()->with('success','Meja billiard berhasil diperbarui.'); } public function destroy(BilliardTable $billiardTable): RedirectResponse { if ($billiardTable->reservations()->exists()) { return back()->with('error', 'Meja billiard tidak dapat dihapus karena memiliki riwayat reservasi pelanggan.'); } $billiardTable->delete(); return back()->with('success', 'Meja billiard berhasil dihapus.'); } public function schedule(): Response { return Inertia::render('Admin/TableSchedule',['tables'=>BilliardTable::with('reservations.user')->orderBy('table_number')->get()]); } }
