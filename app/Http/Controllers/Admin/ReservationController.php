<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservation::with(['user', 'table', 'package'])->latest();

        if ($request->status) {
            $query->where('booking_status', $request->status);
        }

        return Inertia::render('Admin/Bookings', [
            'reservations' => $query->paginate(10),
            'filters' => $request->only('status'),
        ]);
    }

    public function show(Reservation $reservation)
    {
        $reservation->load(['user', 'table', 'package', 'payments']);

        return Inertia::render('Admin/ReservationDetail', [
            'reservation' => $reservation,
        ]);
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'booking_status' => 'required|in:pending,confirmed,playing,completed,cancelled',
        ]);

        $reservation->update($validated);

        return back()->with('success', 'Status reservasi berhasil diupdate.');
    }
}