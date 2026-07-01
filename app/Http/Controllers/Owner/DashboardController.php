<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $driver = DB::connection()->getDriverName();
        $hourExpr = $driver === 'sqlite'
            ? "strftime('%H', start_time)"
            : 'HOUR(start_time)';

        $peakHours = Reservation::select(DB::raw("$hourExpr as hour"), DB::raw('COUNT(*) as count'))
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->map(function ($item) {
                return [
                    'hour' => (int) $item->hour,
                    'count' => (int) $item->count,
                ];
            });

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
            'peakHours' => $peakHours,
        ]);
    }
}
