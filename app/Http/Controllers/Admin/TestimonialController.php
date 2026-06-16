<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Testimonials', [
            'testimonials' => Testimonial::with('user')->latest()->paginate(10),
        ]);
    }

    public function updateStatus(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:active,pending,inactive'],
        ]);

        $testimonial->update(['status' => $validated['status']]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Status testimoni berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil dihapus.');
    }
}
