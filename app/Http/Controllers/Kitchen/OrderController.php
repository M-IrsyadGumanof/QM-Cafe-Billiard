<?php

namespace App\Http\Controllers\Kitchen;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Kitchen/Orders', [
            'orders' => Order::with('user')->latest()->paginate(10),
        ]);
    }

    public function show(Order $order): Response
    {
        return Inertia::render('Kitchen/OrderDetail', [
            'order' => $order->load(['user', 'items']),
        ]);
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        $data = $request->validate([
            'order_status' => 'required|in:processing,ready,completed,cancelled',
        ]);

        $order->update(['order_status' => $data['order_status']]);

        return back()->with('success', 'Status order berhasil diperbarui.');
    }
}
