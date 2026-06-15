<?php

use App\Http\Controllers\Admin\BilliardTableController as AdminBilliardTableController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ReservationController as AdminReservationController;
use App\Http\Controllers\Billiard\DashboardController as BilliardDashboardController;
use App\Http\Controllers\Billiard\ReservationController as BilliardReservationController;
use App\Http\Controllers\Customer\DashboardController as CustomerDashboardController;
use App\Http\Controllers\Customer\MenuController as CustomerMenuController;
use App\Http\Controllers\Customer\OrderController as CustomerOrderController;
use App\Http\Controllers\Customer\ReservationController as CustomerReservationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Kontroler yang belum diimplementasikan di repositori ini (dikomentari agar tidak menyebabkan error)
// use App\Http\Controllers\Admin\FaqController as AdminFaqController;
// use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
// use App\Http\Controllers\Admin\MenuCategoryController as AdminMenuCategoryController;
// use App\Http\Controllers\Admin\MenuController as AdminMenuController;
// use App\Http\Controllers\Admin\NotificationController as AdminNotificationController;
// use App\Http\Controllers\Admin\OrderController as AdminOrderController;
// use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
// use App\Http\Controllers\Admin\ReportController as AdminReportController;
// use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
// use App\Http\Controllers\Admin\UserController as AdminUserController;
// use App\Http\Controllers\Customer\NotificationController as CustomerNotificationController;
// use App\Http\Controllers\Customer\PaymentController as CustomerPaymentController;
// use App\Http\Controllers\Customer\ProfileController as CustomerProfileController;
// use App\Http\Controllers\Customer\TestimonialController as CustomerTestimonialController;
// use App\Http\Controllers\Public\MenuController as PublicMenuController;
// use App\Http\Controllers\Public\PageController;
// use App\Http\Controllers\Public\TableAvailabilityController;
// use App\Http\Controllers\Owner\DashboardController as OwnerDashboardController;
// use App\Http\Controllers\Owner\ReportController as OwnerReportController;
// use App\Http\Controllers\Kitchen\DashboardController as KitchenDashboardController;
// use App\Http\Controllers\Kitchen\OrderController as KitchenOrderController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Rute publik yang kontrolernya belum diimplementasikan (dikomentari sementara)
// Route::get('/about', [PageController::class, 'about'])->name('public.about');
// Route::get('/contact', [PageController::class, 'contact'])->name('public.contact');
// Route::get('/menu', [PublicMenuController::class, 'index'])->name('public.menu.index');
// Route::get('/menu/{menu:slug}', [PublicMenuController::class, 'show'])->name('public.menu.show');
// Route::get('/billiard-packages', [PageController::class, 'packages'])->name('public.packages');
// Route::get('/table-availability', [TableAvailabilityController::class, 'index'])->name('public.table-availability');
// Route::get('/gallery', [PageController::class, 'gallery'])->name('public.gallery');
// Route::get('/faq', [PageController::class, 'faq'])->name('public.faq');
// Route::get('/testimonials', [PageController::class, 'testimonials'])->name('public.testimonials');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
    Route::delete('/profile/avatar', [ProfileController::class, 'destroyAvatar'])->name('profile.avatar.destroy');
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        // Rute admin yang kontrolernya belum diimplementasikan (dikomentari sementara)
        // Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        // Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
        // Route::patch('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
        // Route::patch('/users/{user}/reset-password', [AdminUserController::class, 'resetPassword'])->name('users.reset-password');

        // Route::get('/menu', [AdminMenuController::class, 'index'])->name('menu.index');
        // Route::post('/menu', [AdminMenuController::class, 'store'])->name('menu.store');
        // Route::patch('/menu/{menu}', [AdminMenuController::class, 'update'])->name('menu.update');
        // Route::delete('/menu/{menu}', [AdminMenuController::class, 'destroy'])->name('menu.destroy');
        
        // Route::get('/menu-categories', [AdminMenuCategoryController::class, 'index'])->name('menu-categories.index');
        // Route::post('/menu-categories', [AdminMenuCategoryController::class, 'store'])->name('menu-categories.store');
        // Route::patch('/menu-categories/{menuCategory}', [AdminMenuCategoryController::class, 'update'])->name('menu-categories.update');
        // Route::delete('/menu-categories/{menuCategory}', [AdminMenuCategoryController::class, 'destroy'])->name('menu-categories.destroy');

        Route::get('/billiard-tables', [AdminBilliardTableController::class, 'index'])->name('billiard-tables.index');
        Route::post('/billiard-tables', [AdminBilliardTableController::class, 'store'])->name('billiard-tables.store');
        Route::patch('/billiard-tables/{billiardTable}', [AdminBilliardTableController::class, 'update'])->name('billiard-tables.update');
        Route::delete('/billiard-tables/{billiardTable}', [AdminBilliardTableController::class, 'destroy'])->name('billiard-tables.destroy');
        Route::get('/table-schedule', [AdminBilliardTableController::class, 'schedule'])->name('table-schedule.index');

        Route::get('/bookings', [AdminReservationController::class, 'index'])->name('bookings.index');
        Route::get('/bookings/{reservation}', [AdminReservationController::class, 'show'])->name('bookings.show');
        Route::patch('/bookings/{reservation}/status', [AdminReservationController::class, 'updateStatus'])->name('bookings.status');

        // Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
        // Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
        // Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.status');

        // Route::get('/payments', [AdminPaymentController::class, 'index'])->name('payments.index');
        // Route::get('/payments/{payment}', [AdminPaymentController::class, 'show'])->name('payments.show');
        // Route::patch('/payments/{payment}/verify', [AdminPaymentController::class, 'verify'])->name('payments.verify');

        // Route::get('/faq', [AdminFaqController::class, 'index'])->name('faq.index');
        // Route::post('/faq', [AdminFaqController::class, 'store'])->name('faq.store');
        // Route::patch('/faq/{faq}', [AdminFaqController::class, 'update'])->name('faq.update');
        // Route::delete('/faq/{faq}', [AdminFaqController::class, 'destroy'])->name('faq.destroy');

        // Route::get('/gallery', [AdminGalleryController::class, 'index'])->name('gallery.index');
        // Route::post('/gallery', [AdminGalleryController::class, 'store'])->name('gallery.store');
        // Route::patch('/gallery/{gallery}', [AdminGalleryController::class, 'update'])->name('gallery.update');
        // Route::delete('/gallery/{gallery}', [AdminGalleryController::class, 'destroy'])->name('gallery.destroy');

        // Route::get('/testimonials', [AdminTestimonialController::class, 'index'])->name('testimonials.index');
        // Route::patch('/testimonials/{testimonial}/status', [AdminTestimonialController::class, 'updateStatus'])->name('testimonials.status');
        // Route::delete('/testimonials/{testimonial}', [AdminTestimonialController::class, 'destroy'])->name('testimonials.destroy');

        // Route::get('/notifications', [AdminNotificationController::class, 'index'])->name('notifications.index');
        // Route::get('/reports', [AdminReportController::class, 'index'])->name('reports.index');
        // Route::get('/reports/export', [AdminReportController::class, 'export'])->name('reports.export');
        // Route::get('/statistics', [AdminReportController::class, 'statistics'])->name('statistics.index');
    });
});

Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/dashboard', CustomerDashboardController::class)->name('dashboard');
    // Route::get('/profile', [CustomerProfileController::class, 'index'])->name('profile');
    Route::get('/menu', [CustomerMenuController::class, 'index'])->name('menu.index');
    Route::get('/menu/{menu:slug}', [CustomerMenuController::class, 'show'])->name('menu.show');
    Route::get('/cart', [CustomerOrderController::class, 'cart'])->name('cart.index');
    Route::get('/checkout', [CustomerOrderController::class, 'checkout'])->name('checkout.index');
    Route::post('/checkout', [CustomerOrderController::class, 'store'])->name('checkout.store');
    Route::get('/orders', [CustomerOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [CustomerOrderController::class, 'show'])->name('orders.show');
    Route::get('/reservations', [CustomerReservationController::class, 'index'])->name('reservations.index');
    Route::get('/reservations/create', [CustomerReservationController::class, 'create'])->name('reservations.create');
    Route::post('/reservations', [CustomerReservationController::class, 'store'])->name('reservations.store');
    Route::get('/reservations/{reservation}', [CustomerReservationController::class, 'show'])->name('reservations.show');
    // Route::get('/payments', [CustomerPaymentController::class, 'index'])->name('payments.index');
    // Route::get('/payments/upload', [CustomerPaymentController::class, 'create'])->name('payments.upload');
    // Route::post('/payments', [CustomerPaymentController::class, 'store'])->name('payments.store');
    // Route::get('/testimonials', [CustomerTestimonialController::class, 'index'])->name('testimonials.index');
    // Route::post('/testimonials', [CustomerTestimonialController::class, 'store'])->name('testimonials.store');
    // Route::put('/testimonials/{testimonial}', [CustomerTestimonialController::class, 'update'])->name('testimonials.update');
    // Route::delete('/testimonials/{testimonial}', [CustomerTestimonialController::class, 'destroy'])->name('testimonials.destroy');
    // Route::get('/notifications', [CustomerNotificationController::class, 'index'])->name('notifications.index');
});

// Route::middleware(['auth', 'verified', 'role:kitchen_staff'])->prefix('kitchen')->name('kitchen.')->group(function () {
//     Route::get('/dashboard', KitchenDashboardController::class)->name('dashboard');
//     Route::get('/orders', [KitchenOrderController::class, 'index'])->name('orders.index');
//     Route::get('/orders/{order}', [KitchenOrderController::class, 'show'])->name('orders.show');
//     Route::patch('/orders/{order}/status', [KitchenOrderController::class, 'updateStatus'])->name('orders.status');
// });

Route::middleware(['auth', 'verified', 'role:billiard_staff'])->prefix('billiard')->name('billiard.')->group(function () {
    Route::get('/dashboard', BilliardDashboardController::class)->name('dashboard');
    Route::get('/reservations', [BilliardReservationController::class, 'index'])->name('reservations.index');
    Route::get('/reservations/{reservation}', [BilliardReservationController::class, 'show'])->name('reservations.show');
    Route::patch('/reservations/{reservation}/status', [BilliardReservationController::class, 'updateStatus'])->name('reservations.status');
    Route::get('/table-schedule', [BilliardReservationController::class, 'tableSchedule'])->name('table-schedule.index');
    Route::get('/sessions', [BilliardReservationController::class, 'sessions'])->name('sessions.index');
    Route::get('/personal-billing/{reservation}', [BilliardReservationController::class, 'billing'])->name('personal-billing.show');
});

// Route::middleware(['auth', 'verified', 'role:owner'])->prefix('owner')->name('owner.')->group(function () {
//     Route::get('/dashboard', OwnerDashboardController::class)->name('dashboard');
//     Route::get('/reports', [OwnerReportController::class, 'index'])->name('reports.index');
//     Route::get('/reports/export', [OwnerReportController::class, 'export'])->name('reports.export');
// });

require __DIR__.'/auth.php';
