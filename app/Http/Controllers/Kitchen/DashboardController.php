<?php
namespace App\Http\Controllers\Kitchen;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;
class DashboardController extends Controller { public function __invoke(): Response { return Inertia::render('Kitchen/Dashboard',['stats'=>['incoming'=>Order::whereIn('order_status',['paid','processing'])->count(),'ready'=>Order::where('order_status','ready')->count(),'completed'=>Order::where('order_status','completed')->count()],'orders'=>Order::with('user')->latest()->take(10)->get()]); } }
