<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index()
    {
        return Inertia::render('Customer/Testimonials', [
            'testimonials' => auth()->user()->testimonials()->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:500'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
        ]);

        $request->user()->testimonials()->create([
            'user_id' => $request->user()->id,
            'name' => $request->user()->name,
            'message' => $validated['message'],
            'rating' => $validated['rating'],
            'status' => 'pending',
        ]);

        return redirect()->route('customer.testimonials.index')->with('success', 'Testimoni berhasil dikirim. Menunggu persetujuan admin.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        abort_unless($testimonial->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'message' => ['required', 'string', 'max:500'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
        ]);

        $testimonial->update([
            'message' => $validated['message'],
            'rating' => $validated['rating'],
        ]);

        return redirect()->route('customer.testimonials.index')->with('success', 'Testimoni berhasil diperbarui.');
    }

    public function destroy(Request $request, Testimonial $testimonial)
    {
        abort_unless($testimonial->user_id === $request->user()->id, 403);

        $testimonial->delete();

        return redirect()->route('customer.testimonials.index')->with('success', 'Testimoni berhasil dihapus.');
    }
}
