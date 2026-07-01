<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BilliardTable;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Testimonial;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => User::count(),
                'menus' => Menu::count(),
                'orders' => Order::count(),
                'reservations' => Reservation::count(),
                'pending_payments' => Payment::where('status', 'pending')->count(),
                'available_tables' => BilliardTable::where('status', 'available')->count(),
                'revenue' => Payment::where('status', 'verified')->sum('amount'),
                'testimonials' => Testimonial::count(),
            ],
            'recentOrders' => Order::with('user')->latest()->take(5)->get(),
            'recentReservations' => Reservation::with(['user', 'table', 'package'])->latest()->take(5)->get(),
            'recentPayments' => Payment::with('user')->latest()->take(5)->get(),
            'activeSessions' => Reservation::with(['user', 'table', 'package'])->activePlaying()->get(),
        ]);
    }
}
