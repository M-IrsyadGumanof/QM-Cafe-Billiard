<?php

namespace App\Http\Controllers\Billiard;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with(['user', 'table', 'package'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Billiard/Reservations', [
            'reservations' => $reservations,
        ]);
    }

    public function show(Reservation $reservation)
    {
        $reservation->load(['user', 'table', 'package']);

        return Inertia::render('Billiard/ReservationDetail', [
            'reservation' => $reservation,
        ]);
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'booking_status' => 'required|in:pending,confirmed,playing,completed,cancelled',
        ]);

        $reservation->update($validated);

        return back()->with('success', 'Status berhasil diupdate.');
    }

    public function tableSchedule()
    {
        $reservations = Reservation::with(['user', 'table', 'package'])
            ->latest()
            ->get();

        return Inertia::render('Billiard/TableSchedule', [
            'reservations' => $reservations,
        ]);
    }

    public function sessions()
    {
        $reservations = Reservation::with(['user', 'table', 'package'])
            ->whereIn('booking_status', ['confirmed', 'playing'])
            ->latest()
            ->get();

        return Inertia::render('Billiard/PlayingSessions', [
            'reservations' => $reservations,
        ]);
    }

    public function billing(Reservation $reservation)
    {
        $reservation->load(['user', 'table', 'package']);

        return Inertia::render('Billiard/PersonalBilling', [
            'reservation' => $reservation,
        ]);
    }
}