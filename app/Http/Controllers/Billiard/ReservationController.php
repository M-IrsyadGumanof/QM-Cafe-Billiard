<?php

namespace App\Http\Controllers\Billiard;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Billiard/Reservations', [
            'reservations' => Reservation::with(['user', 'table', 'package'])->latest()->paginate(10),
        ]);
    }

    public function show(Reservation $reservation): Response
    {
        return Inertia::render('Billiard/ReservationDetail', [
            'reservation' => $reservation->load(['user', 'table', 'package']),
        ]);
    }

    public function updateStatus(Request $request, Reservation $reservation): RedirectResponse
    {
        $data = $request->validate([
            'booking_status' => 'required|in:pending,confirmed,playing,completed,cancelled',
        ]);

        $reservation->update(['booking_status' => $data['booking_status']]);

        return back()->with('success', 'Status reservasi berhasil diperbarui.');
    }

    public function tableSchedule(): Response
    {
        return Inertia::render('Billiard/TableSchedule', [
            'reservations' => Reservation::with(['user', 'table', 'package'])->latest()->get(),
        ]);
    }

    public function sessions(): Response
    {
        return Inertia::render('Billiard/PlayingSessions', [
            'reservations' => Reservation::with(['user', 'table', 'package'])
                ->whereIn('booking_status', ['confirmed', 'playing'])
                ->latest()
                ->get(),
        ]);
    }

    public function billing(Reservation $reservation): Response
    {
        return Inertia::render('Billiard/PersonalBilling', [
            'reservation' => $reservation->load(['user', 'table', 'package']),
        ]);
    }
}
