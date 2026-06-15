<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
class ReservationController extends Controller { public function index(Request $request): Response { return Inertia::render('Admin/Bookings',['reservations'=>Reservation::with(['user','table','package'])->when($request->status,fn($q,$v)=>$q->where('booking_status',$v))->latest()->paginate(10)->withQueryString(),'filters'=>$request->only('status')]); } public function show(Reservation $reservation): Response { return Inertia::render('Admin/ReservationDetail',['reservation'=>$reservation->load(['user','table','package','payments'])]); } public function updateStatus(Request $request, Reservation $reservation): RedirectResponse { $data=$request->validate(['booking_status'=>'required|in:pending,confirmed,playing,completed,cancelled']); $reservation->update(['booking_status'=>$data['booking_status']]); return back()->with('success','Status reservasi berhasil diperbarui.'); } }
