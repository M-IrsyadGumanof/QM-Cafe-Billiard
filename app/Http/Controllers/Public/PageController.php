<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BilliardPackage;
use App\Models\Faq;
use App\Models\Gallery;
use App\Models\Menu;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Public/Home', [
            'stats' => [
                'tables' => 6,
                'menus' => Menu::where('status', 'available')->count(),
                'packages' => BilliardPackage::where('status', 'active')->count(),
            ],
            'galleries' => Gallery::where('status', 'active')->latest()->take(6)->get(),
            'testimonials' => Testimonial::with('user')->where('status', 'active')->latest()->take(3)->get(),
            'packages' => BilliardPackage::where('status', 'active')->orderBy('type')->take(3)->get(),
            'menus' => Menu::with('category')->where('status', 'available')->latest()->take(4)->get(),
        ]);
    }

    public function about(): Response { return Inertia::render('Public/About'); }
    public function contact(): Response { return Inertia::render('Public/Contact'); }

    public function packages(): Response
    {
        return Inertia::render('Public/BilliardPackages', [
            'packages' => BilliardPackage::where('status','active')->orderBy('type')->get(),
        ]);
    }

    public function gallery(): Response
    {
        return Inertia::render('Public/Gallery', ['galleries' => Gallery::where('status','active')->latest()->get()]);
    }

    public function faq(): Response
    {
        return Inertia::render('Public/Faq', ['faqs' => Faq::where('status','active')->orderBy('category')->get()]);
    }

    public function testimonials(): Response
    {
        return Inertia::render('Public/Testimonials', ['testimonials' => Testimonial::with('user')->where('status','active')->latest()->get()]);
    }
}
