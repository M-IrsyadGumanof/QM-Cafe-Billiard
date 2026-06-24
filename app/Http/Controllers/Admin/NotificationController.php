<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QmNotification;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Notifications', [
            'notifications' => QmNotification::whereNull('user_id')
                ->orWhere('target_role', 'admin')
                ->latest()
                ->paginate(15),
        ]);
    }
}
