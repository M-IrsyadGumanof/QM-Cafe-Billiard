<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\QmNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Admin/Payments', [
            'payments' => Payment::with(['user', 'order', 'reservation'])
                ->when($request->status, fn ($q, $v) => $q->where('status', $v))
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only('status'),
        ]);
    }

    public function show(Payment $payment): Response
    {
        return Inertia::render('Admin/PaymentDetail', [
            'payment' => $payment->load(['user', 'order', 'reservation', 'verifier']),
        ]);
    }

    public function verify(Request $request, Payment $payment): RedirectResponse
    {
        $data = $request->validate([
            'status' => 'required|in:verified,rejected',
            'notes' => 'nullable|string|max:1000',
        ]);

        DB::transaction(function () use ($payment, $data) {
            $payment->update([
                'status' => $data['status'],
                'notes' => $data['notes'] ?? $payment->notes,
                'verified_by' => auth()->id(),
                'verified_at' => now(),
            ]);

            if ($payment->order) {
                $payment->order->update([
                    'payment_status' => $data['status'],
                    'order_status' => $data['status'] === 'verified' ? 'processing' : 'pending_payment',
                ]);
            }

            if ($payment->reservation) {
                $payment->reservation->update([
                    'payment_status' => $data['status'],
                    'booking_status' => $data['status'] === 'verified'
                        ? 'confirmed'
                        : $payment->reservation->booking_status,
                ]);
            }

            QmNotification::create([
                'user_id' => $payment->user_id,
                'title' => 'Payment '.$data['status'],
                'message' => 'Pembayaran '.$payment->payment_code.' berstatus '.$data['status'].'.',
                'type' => 'payment',
            ]);
        });

        return back()->with('success', 'Pembayaran berhasil diproses.');
    }
}
