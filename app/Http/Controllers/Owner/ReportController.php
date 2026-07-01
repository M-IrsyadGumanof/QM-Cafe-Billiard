<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Owner/Reports', [
            'summary' => [
                'orders' => Order::count(),
                'reservations' => Reservation::count(),
                'payments' => Payment::count(),
                'revenue' => Payment::where('status', 'verified')->sum('amount'),
                'pending_payments' => Payment::where('status', 'pending')->count(),
            ],
            'orders' => Order::with('user')->latest()->take(10)->get(),
            'reservations' => Reservation::with(['user', 'table'])->latest()->take(10)->get(),
        ]);
    }

    public function export(Request $request)
    {
        $type = $request->query('type', 'payments');
        $filename = "report-{$type}-".date('Ymd-His').'.csv';
        $headers = [
            'Content-type' => 'text/csv; charset=UTF-8',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($type) {
            $file = fopen('php://output', 'w');
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));

            if ($type === 'orders') {
                fputcsv($file, ['ID', 'Order Code', 'User Name', 'User Email', 'Total Amount', 'Order Status', 'Payment Status', 'Created At']);
                foreach (Order::with('user')->latest()->get() as $order) {
                    fputcsv($file, [
                        $order->id,
                        $order->order_code,
                        $order->user?->name ?? 'N/A',
                        $order->user?->email ?? 'N/A',
                        $order->total_amount,
                        $order->order_status,
                        $order->payment_status,
                        $order->created_at,
                    ]);
                }
            } elseif ($type === 'reservations') {
                fputcsv($file, ['ID', 'Reservation Code', 'User Name', 'Table Name', 'Package Name', 'Date', 'Start Time', 'End Time', 'Total Price', 'Booking Status', 'Payment Status', 'Created At']);
                foreach (Reservation::with(['user', 'table', 'package'])->latest()->get() as $res) {
                    fputcsv($file, [
                        $res->id,
                        $res->reservation_code,
                        $res->user?->name ?? 'N/A',
                        $res->table?->name ?? 'N/A',
                        $res->package?->name ?? 'N/A',
                        $res->reservation_date,
                        $res->start_time,
                        $res->end_time,
                        $res->total_price,
                        $res->booking_status,
                        $res->payment_status,
                        $res->created_at,
                    ]);
                }
            } else {
                fputcsv($file, ['ID', 'Payment Code', 'User Name', 'Amount', 'Payment Method', 'Status', 'Notes', 'Created At']);
                foreach (Payment::with('user')->latest()->get() as $payment) {
                    fputcsv($file, [
                        $payment->id,
                        $payment->payment_code,
                        $payment->user?->name ?? 'N/A',
                        $payment->amount,
                        $payment->payment_method,
                        $payment->status,
                        $payment->notes,
                        $payment->created_at,
                    ]);
                }
            }

            fclose($file);
        };

        return response()->streamDownload($callback, $filename, $headers);
    }
}
