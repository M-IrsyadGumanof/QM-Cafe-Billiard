<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\MenuCategoryController as AdminMenuCategoryController;
use App\Http\Controllers\Admin\MenuController as AdminMenuController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
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

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
        Route::patch('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
        Route::patch('/users/{user}/reset-password', [AdminUserController::class, 'resetPassword'])->name('users.reset-password');

        Route::get('/menu', [AdminMenuController::class, 'index'])->name('menu.index');
        Route::post('/menu', [AdminMenuController::class, 'store'])->name('menu.store');
        Route::patch('/menu/{menu}', [AdminMenuController::class, 'update'])->name('menu.update');
        Route::delete('/menu/{menu}', [AdminMenuController::class, 'destroy'])->name('menu.destroy');

        Route::get('/menu-categories', [AdminMenuCategoryController::class, 'index'])->name('menu-categories.index');
        Route::post('/menu-categories', [AdminMenuCategoryController::class, 'store'])->name('menu-categories.store');
        Route::patch('/menu-categories/{menuCategory}', [AdminMenuCategoryController::class, 'update'])->name('menu-categories.update');
        Route::delete('/menu-categories/{menuCategory}', [AdminMenuCategoryController::class, 'destroy'])->name('menu-categories.destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

