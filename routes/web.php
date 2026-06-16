<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin-dashboard', \App\Http\Controllers\Admin\DashboardController::class)->name('admin.dashboard');
    
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/notifications', [\App\Http\Controllers\Admin\NotificationController::class, 'index'])->name('notifications.index');
        Route::get('/reports', [\App\Http\Controllers\Admin\ReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/export', [\App\Http\Controllers\Admin\ReportController::class, 'export'])->name('reports.export');
        Route::get('/statistics', [\App\Http\Controllers\Admin\ReportController::class, 'statistics'])->name('statistics.index');
    });
});

Route::middleware(['auth', 'verified'])->prefix('kitchen')->name('kitchen.')->group(function () {
    Route::get('/dashboard', \App\Http\Controllers\Kitchen\DashboardController::class)->name('dashboard');
    Route::get('/orders', [\App\Http\Controllers\Kitchen\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [\App\Http\Controllers\Kitchen\OrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/status', [\App\Http\Controllers\Kitchen\OrderController::class, 'updateStatus'])->name('orders.status');
});

Route::middleware(['auth', 'verified'])->prefix('owner')->name('owner.')->group(function () {
    Route::get('/dashboard', \App\Http\Controllers\Owner\DashboardController::class)->name('dashboard');
    Route::get('/reports', [\App\Http\Controllers\Owner\ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/export', [\App\Http\Controllers\Owner\ReportController::class, 'export'])->name('reports.export');
});

require __DIR__.'/auth.php';
