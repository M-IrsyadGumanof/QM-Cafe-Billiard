<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Order;
use App\Models\QmNotification;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function cart(): Response { return Inertia::render('Customer/Cart'); }
    public function checkout(): Response { return Inertia::render('Customer/Checkout'); }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.menu_id' => 'required|exists:menus,id',
            'items.*.quantity' => 'required|integer|min:1|max:99',
            'payment_method' => 'required|string|in:transfer,qris,cash',
            'notes' => 'nullable|string|max:1000',
        ]);

        $order = DB::transaction(function () use ($validated) {
            $menus = Menu::whereIn('id', collect($validated['items'])->pluck('menu_id'))->get()->keyBy('id');
            $total = 0;
            foreach ($validated['items'] as $item) {
                $menu = $menus[$item['menu_id']];
                abort_unless($menu->status === 'available', 422, 'Menu tidak tersedia.');
                $total += $menu->price * $item['quantity'];
            }

            $order = Order::create([
                'user_id' => auth()->id(),
                'order_code' => $this->generateOrderCode(),
                'total_amount' => $total,
                'payment_method' => $validated['payment_method'],
                'order_status' => $validated['payment_method'] === 'cash' ? 'paid' : 'pending_payment',
                'payment_status' => $validated['payment_method'] === 'cash' ? 'verified' : 'unpaid',
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($validated['items'] as $item) {
                $menu = $menus[$item['menu_id']];
                $order->items()->create([
                    'menu_id' => $menu->id,
                    'menu_name' => $menu->name,
                    'price' => $menu->price,
                    'quantity' => $item['quantity'],
                    'subtotal' => $menu->price * $item['quantity'],
                ]);
            }

            QmNotification::create([
                'target_role' => 'admin',
                'title' => 'New Food/Drink Order',
                'message' => 'Order '.$order->order_code.' menunggu pengecekan admin/cashier.',
                'type' => 'order',
            ]);
            QmNotification::create([
                'target_role' => 'kitchen_staff',
                'title' => 'Incoming Order',
                'message' => 'Order '.$order->order_code.' sudah masuk ke daftar kitchen.',
                'type' => 'order',
            ]);

            return $order;
        });

        return redirect()->route('customer.orders.show', $order)->with('success', 'Order berhasil dibuat.');
    }

    public function index(): Response
    {
        return Inertia::render('Customer/Orders', [
            'orders' => auth()->user()->orders()->latest()->paginate(10),
        ]);
    }

    public function show(Order $order): Response
    {
        abort_unless($order->user_id === auth()->id(), 403);
        return Inertia::render('Customer/OrderDetail', ['order' => $order->load(['items','payments'])]);
    }

    private function generateOrderCode(): string
    {
        $prefix = 'ORD-'.now()->format('Ymd').'-';
        $number = Order::where('order_code','like',$prefix.'%')->count() + 1;
        return $prefix.str_pad((string)$number, 4, '0', STR_PAD_LEFT);
    }
}
