<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\{Order, OrderItem, Payment, Reservation, User};
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Owner/Dashboard', [
            'summary' => [
                'users' => User::count(),
                'orders' => Order::count(),
                'reservations' => Reservation::count(),
                'revenue' => Payment::where('status', 'verified')->sum('amount'),
                'pending_payments' => Payment::where('status', 'pending')->count(),
            ],
            'orders' => Order::with('user')->latest()->take(5)->get(),
            'reservations' => Reservation::with(['user', 'table'])->latest()->take(5)->get(),
            'topMenuItems' => OrderItem::select('menu_name', DB::raw('SUM(quantity) as total_sold'))
                ->groupBy('menu_name')
                ->orderByDesc('total_sold')
                ->take(5)
                ->get(),
            'peakHours' => Reservation::select(DB::raw('HOUR(start_time) as hour'), DB::raw('COUNT(*) as count'))
                ->groupBy('hour')
                ->orderBy('hour')
                ->get(),
        ]);
    }
}
