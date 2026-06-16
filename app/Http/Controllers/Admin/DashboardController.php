<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
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
                'orders' => 0,
                'reservations' => 0,
                'pending_payments' => 0,
                'available_tables' => 0,
                'revenue' => 0,
                'testimonials' => 0,
            ],
            'recentOrders' => [],
            'recentReservations' => [],
            'recentPayments' => [],
        ]);
    }
}
