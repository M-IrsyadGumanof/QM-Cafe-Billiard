<?php

namespace App\Http\Controllers\Billiard;

use App\Http\Controllers\Controller;
use App\Models\BilliardTable;
use App\Models\Reservation;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Billiard/Dashboard', [
            'available_tables' => BilliardTable::where('status', 'available')->count(),
            'reserved' => Reservation::where('booking_status', 'confirmed')->count(),
            'playing' => Reservation::where('booking_status', 'playing')->count(),
            'reservations' => Reservation::with(['user', 'table', 'package'])
                ->latest()
                ->take(10)
                ->get(),
        ]);
    }
}