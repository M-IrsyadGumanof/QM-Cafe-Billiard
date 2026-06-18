<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Admin/Orders', [
            'orders' => Order::with('user')
                ->when($request->status, fn ($q, $v) => $q->where('order_status', $v))
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only('status'),
        ]);
    }

    public function show(Order $order): Response
    {
        return Inertia::render('Admin/OrderDetail', [
            'order' => $order->load(['user', 'items', 'payments']),
        ]);
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        $data = $request->validate([
            'order_status' => 'required|in:pending_payment,paid,processing,ready,completed,cancelled',
        ]);

        $order->update(['order_status' => $data['order_status']]);

        return back()->with('success', 'Status order berhasil diperbarui.');
    }
}
