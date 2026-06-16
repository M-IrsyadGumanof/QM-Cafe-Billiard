<?php
namespace App\Http\Controllers\Customer;
use App\Http\Controllers\Controller;
use App\Models\QmNotification;
use Inertia\Inertia;
use Inertia\Response;
class NotificationController extends Controller { public function index(): Response { return Inertia::render('Customer/Notifications', ['notifications'=>QmNotification::where(function($q){$q->where('user_id',auth()->id())->orWhere('target_role','customer');})->latest()->paginate(15)]); } }
