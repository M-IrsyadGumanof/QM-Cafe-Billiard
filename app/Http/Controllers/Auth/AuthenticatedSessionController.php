<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function generateCaptcha()
    {
        $characters = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        $code = '';
        for ($i = 0; $i < 6; $i++) {
            $code .= $characters[rand(0, strlen($characters) - 1)];
        }

        session(['captcha' => $code]);

        $width = 150;
        $height = 42;

        $svg = "<svg xmlns='http://www.w3.org/2000/svg' width='{$width}' height='{$height}' viewBox='0 0 {$width} {$height}' style='background-color: #151919; border: 1px solid #2b3232; border-radius: 7px;'>";

        // Add noise lines
        for ($i = 0; $i < 4; $i++) {
            $x1 = rand(0, $width);
            $y1 = rand(0, $height);
            $x2 = rand(0, $width);
            $y2 = rand(0, $height);
            $colors = ['#ffcc00', '#ffd633', '#4f5e5e', '#ff3b30'];
            $color = $colors[array_rand($colors)];
            $svg .= "<line x1='{$x1}' y1='{$y1}' x2='{$x2}' y2='{$y2}' stroke='{$color}' stroke-width='1.5' opacity='0.35' />";
        }

        // Add noise dots
        for ($i = 0; $i < 30; $i++) {
            $cx = rand(0, $width);
            $cy = rand(0, $height);
            $r = rand(1, 2);
            $svg .= "<circle cx='{$cx}' cy='{$cy}' r='{$r}' fill='#4f5e5e' opacity='0.4' />";
        }

        // Add characters
        $x = 15;
        for ($i = 0; $i < 6; $i++) {
            $char = $code[$i];
            $y = rand(26, 32);
            $angle = rand(-15, 15);
            $fontSize = rand(20, 24);
            $colors = ['#ffcc00', '#ffd633', '#ffffff', '#e6b800'];
            $color = $colors[array_rand($colors)];

            $svg .= "<text x='{$x}' y='{$y}' fill='{$color}' font-size='{$fontSize}' font-family='Courier New, monospace' font-weight='bold' transform='rotate({$angle} {$x} {$y})'>{$char}</text>";
            $x += rand(18, 22);
        }

        $svg .= '</svg>';

        return response($svg, 200)
            ->header('Content-Type', 'image/svg+xml')
            ->header('Cache-Control', 'no-cache, no-store, must-revalidate');
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        if ($request->user()->status !== 'active') {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            throw ValidationException::withMessages([
                'email' => 'Your account is not active or has been deactivated.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('home', absolute: false));
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
