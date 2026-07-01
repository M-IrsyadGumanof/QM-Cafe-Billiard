<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $user = auth()->user();

        return Inertia::render('Customer/Dashboard', [
            'summary' => [
                'orders' => $user->orders()->count(),
                'reservations' => $user->reservations()->count(),
                'pending_payments' => $user->payments()->where('status', 'pending')->count(),
                'notifications' => $user->qmNotifications()->where('is_read', false)->count(),
            ],
            'recentOrders' => $user->orders()->latest()->take(5)->get(),
            'recentReservations' => $user->reservations()->with(['table', 'package'])->latest()->take(5)->get(),
            'recentPayments' => $user->payments()->latest()->take(5)->get(),
            'activeSession' => $user->reservations()->with(['table', 'package'])->activePlaying()->first(),
        ]);
    }
}
