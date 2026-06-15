<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function cart(): Response
    {
        return Inertia::render('Customer/Cart');
    }

    public function checkout(): Response
    {
        return Inertia::render('Customer/Checkout', [
            'isSkeleton' => true,
        ]);
    }

    public function store(): RedirectResponse
    {
        return back()->with('info', 'Checkout final menunggu data menu dari modul Admin Menu.');
    }

    public function index(): Response
    {
        return Inertia::render('Customer/Orders', [
            'orders' => [],
            'isSkeleton' => true,
        ]);
    }

    public function show(string $order): Response
    {
        return Inertia::render('Customer/OrderDetail', [
            'order' => null,
            'orderId' => $order,
            'isSkeleton' => true,
        ]);
    }
}
