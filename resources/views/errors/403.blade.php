<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Akses Ditolak - {{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    @if(!app()->environment('testing'))
        @vite(['resources/css/app.css'])
    @endif
    
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
        $dashboardUrl = route('home', [], false);
        $roleName = '';
        
        if ($user) {
            if ($user->role === 'admin') {
                $dashboardUrl = route('dashboard', [], false);
                $roleName = 'Admin';
            } elseif ($user->role === 'customer') {
                $dashboardUrl = route('customer.dashboard', [], false);
                $roleName = 'Customer';
            } elseif ($user->role === 'kitchen_staff') {
                $dashboardUrl = route('kitchen.dashboard', [], false);
                $roleName = 'Kitchen Staff';
            } elseif ($user->role === 'billiard_staff') {
                $dashboardUrl = route('billiard.dashboard', [], false);
                $roleName = 'Billiard Staff';
            } elseif ($user->role === 'owner') {
                $dashboardUrl = route('owner.dashboard', [], false);
                $roleName = 'Owner';
            }
        } else {
            $dashboardUrl = route('login', [], false);
        }
    @endphp

    <div class="max-w-md w-full glass-panel rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
        <!-- Glow top -->
        <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Shield Icon with Keyhole (403 Forbidden) -->
        <div class="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center bg-brand/5 border border-brand/20 rounded-2xl shadow-inner group">
            <div class="absolute inset-0 bg-brand/5 rounded-2xl blur-md opacity-50"></div>
            <svg class="w-12 h-12 text-brand relative z-10 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-extrabold text-brand mb-3 tracking-wide">403</h1>
        <h2 class="text-xl font-bold text-white mb-4 tracking-tight">Akses Ditolak</h2>
        
        <p class="text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
            @if($user)
                Halo, <span class="text-white font-medium">{{ $user->name }}</span> ({{ $roleName }}). 
                Anda tidak memiliki hak akses atau otorisasi untuk membuka halaman ini.
            @else
                Anda tidak memiliki izin untuk mengakses halaman ini. Silakan masuk terlebih dahulu dengan akun yang memiliki wewenang.
            @endif
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
            @if($user)
                <a href="{{ $dashboardUrl }}" target="_top" class="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-brand text-slate-900 font-extrabold hover:bg-brand-hover active:scale-95 transition-all duration-200 shadow-lg shadow-brand/10 text-sm">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    Kembali ke Dashboard
                </a>
                
                <form action="{{ route('logout', [], false) }}" method="POST" target="_top" class="inline m-0">
                    @csrf
                    <button type="submit" class="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border-strong bg-surface/50 text-slate-300 font-bold hover:bg-surface hover:text-white active:scale-95 transition-all duration-200 text-sm">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Keluar & Login Lainnya
                    </button>
                </form>
            @else
                <a href="{{ route('login', [], false) }}" target="_top" class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand text-slate-900 font-extrabold hover:bg-brand-hover active:scale-95 transition-all duration-200 shadow-lg shadow-brand/10 text-sm">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Masuk Sekarang
                </a>
            @endif
        </div>
    </div>

    <script>
        // Force top-level navigation for all anchor links with target="_top"
        document.querySelectorAll('a[target="_top"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.top && window.top !== window) {
                    window.top.location.href = this.href;
                } else {
                    window.location.href = this.href;
                }
            });
        });

        // Force top-level form submission for forms with target="_top"
        document.querySelectorAll('form[target="_top"]').forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                if (window.top && window.top !== window) {
                    const topForm = window.top.document.createElement('form');
                    topForm.action = this.action;
                    topForm.method = this.method;
                    topForm.style.display = 'none';

                    const csrfToken = this.querySelector('input[name="_token"]');
                    if (csrfToken) {
                        const topCsrf = window.top.document.createElement('input');
                        topCsrf.type = 'hidden';
                        topCsrf.name = '_token';
                        topCsrf.value = csrfToken.value;
                        topForm.appendChild(topCsrf);
                    }

                    window.top.document.body.appendChild(topForm);
                    topForm.submit();
                } else {
                    this.submit();
                }
            });
        });
    </script>
</body>
</html>
