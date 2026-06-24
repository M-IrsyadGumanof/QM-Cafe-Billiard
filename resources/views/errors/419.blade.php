<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sesi Berakhir - {{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    @vite(['resources/css/app.css'])
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-image:
                radial-gradient(
                    circle at top,
                    rgba(255, 204, 0, 0.12),
                    transparent 25%
                ),
                linear-gradient(135deg, #111515 0%, #151a1a 45%, #111515 100%);
            background-attachment: fixed;
        }
        h1, h2, h3, h4 {
            font-family: 'Playfair Display', serif;
        }
        .glass-panel {
            background: linear-gradient(135deg, rgba(29, 34, 34, 0.75) 0%, rgba(17, 21, 21, 0.95) 100%);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(43, 50, 50, 0.8);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
    </style>
</head>
<body class="antialiased min-h-screen text-slate-100 flex items-center justify-center p-4">
    @php
        $user = auth()->user();
        $homeUrl = route('home', [], false);
        $buttonText = 'Kembali ke Beranda';
        
        if ($user) {
            $buttonText = 'Kembali ke Dashboard';
            if ($user->role === 'admin') {
                $homeUrl = route('dashboard', [], false);
            } elseif ($user->role === 'customer') {
                $homeUrl = route('customer.dashboard', [], false);
            } elseif ($user->role === 'kitchen_staff') {
                $homeUrl = route('kitchen.dashboard', [], false);
            } elseif ($user->role === 'billiard_staff') {
                $homeUrl = route('billiard.dashboard', [], false);
            } elseif ($user->role === 'owner') {
                $homeUrl = route('owner.dashboard', [], false);
            }
        }
    @endphp

    <div class="max-w-md w-full glass-panel rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
        <!-- Glow top -->
        <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Clock/Refresh Icon (419 Page Expired) -->
        <div class="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center bg-brand/5 border border-brand/20 rounded-2xl shadow-inner group">
            <div class="absolute inset-0 bg-brand/5 rounded-2xl blur-md opacity-50"></div>
            <svg class="w-12 h-12 text-brand relative z-10 animate-spin" style="animation-duration: 8s;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-extrabold text-brand mb-3 tracking-wide">419</h1>
        <h2 class="text-xl font-bold text-white mb-4 tracking-tight">Sesi Halaman Berakhir</h2>
        
        <p class="text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
            Sesi halaman Anda telah berakhir karena tidak ada aktivitas dalam waktu lama atau masalah keamanan CSRF token. Silakan muat ulang halaman ini.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button onclick="window.top.location.reload();" class="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-brand text-slate-900 font-extrabold hover:bg-brand-hover active:scale-95 transition-all duration-200 shadow-lg shadow-brand/10 text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4"></path>
                </svg>
                Muat Ulang Halaman
            </button>
            
            <a href="{{ $homeUrl }}" target="_top" class="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border-strong bg-surface/50 text-slate-300 font-bold hover:bg-surface hover:text-white active:scale-95 transition-all duration-200 text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                {{ $buttonText }}
            </a>
        </div>
    </div>
</body>
</html>
