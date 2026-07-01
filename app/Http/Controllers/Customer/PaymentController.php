<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\QmNotification;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Customer/Payments', [
            'payments' => auth()->user()->payments()->with(['order', 'reservation'])->latest()->paginate(10),
        ]);
    }

    public function create(Request $request): Response
    {
        $type = $request->query('type', 'order');
        $id = (int) $request->query('id');
        $target = $type === 'reservation' ? Reservation::findOrFail($id) : Order::findOrFail($id);
        abort_unless($target->user_id === auth()->id(), 403);

        return Inertia::render('Customer/PaymentUpload', ['targetType' => $type, 'target' => $target]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:order,reservation',
            'id' => 'required|integer',
            'payment_method' => 'required|in:transfer,qris,cash',
            'proof_image' => 'nullable|image|max:2048',
            'notes' => 'nullable|string|max:1000',
        ]);

        $target = $validated['type'] === 'reservation'
            ? Reservation::findOrFail($validated['id'])
            : Order::findOrFail($validated['id']);
        abort_unless($target->user_id === auth()->id(), 403);

        $path = $request->file('proof_image')?->store('payment-proofs', 'public');
        $amount = $validated['type'] === 'reservation' ? $target->total_price : $target->total_amount;

        $payment = Payment::create([
            'user_id' => auth()->id(),
            'order_id' => $validated['type'] === 'order' ? $target->id : null,
            'reservation_id' => $validated['type'] === 'reservation' ? $target->id : null,
            'payment_code' => $this->generatePaymentCode(),
            'payment_method' => $validated['payment_method'],
            'amount' => $amount,
            'proof_image' => $path,
            'status' => 'pending',
            'notes' => $validated['notes'] ?? null,
        ]);

        $target->update(['payment_status' => 'pending']);
        QmNotification::create(['target_role' => 'admin', 'title' => 'Payment Proof Uploaded', 'message' => 'Bukti pembayaran '.$payment->payment_code.' menunggu verifikasi.', 'type' => 'payment']);

        return redirect()->route('customer.payments.index')->with('success', 'Bukti pembayaran berhasil diupload.');
    }

    private function generatePaymentCode(): string
    {
        $prefix = 'PAY-'.now()->format('Ymd').'-';
        $number = Payment::where('payment_code', 'like', $prefix.'%')->count() + 1;

        return $prefix.str_pad((string) $number, 4, '0', STR_PAD_LEFT);
    }
}
