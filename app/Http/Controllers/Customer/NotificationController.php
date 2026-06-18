<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\QmNotification;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Customer/Notifications', [
            'notifications' => QmNotification::where(function ($q) {
                $q->where('user_id', auth()->id())
                    ->orWhere('target_role', 'customer');
            })->latest()->paginate(15),
        ]);
    }

    /**
     * Tandai notifikasi sebagai sudah dibaca.
     * Digunakan saat customer menutup/dismiss pop-up notifikasi.
     */
    public function markAsRead(QmNotification $notification): JsonResponse
    {
        // Pastikan notifikasi milik user yang sedang login atau bertarget role customer
        abort_unless(
            $notification->user_id === auth()->id() || $notification->target_role === 'customer',
            403,
            'Anda tidak memiliki akses ke notifikasi ini.'
        );

        $notification->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }
}
