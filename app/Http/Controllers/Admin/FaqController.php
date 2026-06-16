<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
class FaqController extends Controller { public function index(): Response { return Inertia::render('Admin/Faq',['faqs'=>Faq::latest()->paginate(10)]); } public function store(Request $request): RedirectResponse { $data=$request->validate(['question'=>'required|string|max:255','answer'=>'required|string','category'=>'required|string|max:100','status'=>'required|in:active,inactive']); Faq::create($data); return back()->with('success','FAQ berhasil ditambahkan.'); } public function update(Request $request, Faq $faq): RedirectResponse { $data=$request->validate(['question'=>'required|string|max:255','answer'=>'required|string','category'=>'required|string|max:100','status'=>'required|in:active,inactive']); $faq->update($data); return back()->with('success','FAQ berhasil diperbarui.'); } public function destroy(Faq $faq): RedirectResponse { $faq->delete(); return back()->with('success', 'FAQ berhasil dihapus.'); } }
