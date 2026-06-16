<?php
namespace App\Http\Controllers\Owner;
use App\Http\Controllers\Controller;
use App\Models\{Order,Payment,Reservation,User};
use Inertia\Inertia;
use Inertia\Response;
class DashboardController extends Controller { public function __invoke(): Response { return Inertia::render('Owner/Dashboard',['summary'=>['users'=>User::count(),'orders'=>Order::count(),'reservations'=>Reservation::count(),'revenue'=>Payment::where('status','verified')->sum('amount'),'pending_payments'=>Payment::where('status','pending')->count()]]); } }
