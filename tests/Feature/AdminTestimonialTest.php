<?php

namespace Tests\Feature;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTestimonialTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_manage_testimonials(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $customer = User::factory()->create(['role' => 'customer']);
        $testimonial = Testimonial::create([
            'user_id' => $customer->id,
            'name' => $customer->name,
            'message' => 'Layanan bagus',
            'rating' => 5,
            'status' => 'pending',
        ]);

        $this->actingAs($admin)
            ->get('/admin/testimonials')
            ->assertOk();

        $this->actingAs($admin)
            ->patch("/admin/testimonials/{$testimonial->id}/status", ['status' => 'active'])
            ->assertRedirect('/admin/testimonials');

        $testimonial->refresh();
        $this->assertSame('active', $testimonial->status);

        $this->actingAs($admin)
            ->delete("/admin/testimonials/{$testimonial->id}")
            ->assertRedirect('/admin/testimonials');

        $this->assertDatabaseMissing('testimonials', ['id' => $testimonial->id]);
    }
}
