<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Customer\ReservationController as CustomerReservationController;
use App\Http\Controllers\Admin\BilliardTableController as AdminBilliardTableController;
use App\Http\Controllers\Admin\ReservationController as AdminReservationController;
use App\Http\Controllers\Billiard\DashboardController as BilliardDashboardController;
use App\Http\Controllers\Billiard\ReservationController as BilliardReservationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Customer Routes
Route::middleware(['auth', 'verified'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/reservations', [CustomerReservationController::class, 'index'])->name('reservations.index');
    Route::get('/reservations/create', [CustomerReservationController::class, 'create'])->name('reservations.create');
    Route::post('/reservations', [CustomerReservationController::class, 'store'])->name('reservations.store');
    Route::get('/reservations/{reservation}', [CustomerReservationController::class, 'show'])->name('reservations.show');
});

// Admin Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/billiard-tables', [AdminBilliardTableController::class, 'index'])->name('billiard-tables.index');
    Route::post('/billiard-tables', [AdminBilliardTableController::class, 'store'])->name('billiard-tables.store');
    Route::patch('/billiard-tables/{billiardTable}', [AdminBilliardTableController::class, 'update'])->name('billiard-tables.update');
    Route::delete('/billiard-tables/{billiardTable}', [AdminBilliardTableController::class, 'destroy'])->name('billiard-tables.destroy');
    Route::get('/table-schedule', [AdminBilliardTableController::class, 'schedule'])->name('table-schedule.index');

    Route::get('/bookings', [AdminReservationController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{reservation}', [AdminReservationController::class, 'show'])->name('bookings.show');
    Route::patch('/bookings/{reservation}/status', [AdminReservationController::class, 'updateStatus'])->name('bookings.status');
});

// Billiard Staff Routes
Route::middleware(['auth', 'verified'])->prefix('billiard')->name('billiard.')->group(function () {
    Route::get('/dashboard', BilliardDashboardController::class)->name('dashboard');
    Route::get('/reservations', [BilliardReservationController::class, 'index'])->name('reservations.index');
    Route::get('/reservations/{reservation}', [BilliardReservationController::class, 'show'])->name('reservations.show');
    Route::patch('/reservations/{reservation}/status', [BilliardReservationController::class, 'updateStatus'])->name('reservations.status');
    Route::get('/table-schedule', [BilliardReservationController::class, 'tableSchedule'])->name('table-schedule.index');
    Route::get('/sessions', [BilliardReservationController::class, 'sessions'])->name('sessions.index');
    Route::get('/personal-billing/{reservation}', [BilliardReservationController::class, 'billing'])->name('personal-billing.show');
});

// Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';