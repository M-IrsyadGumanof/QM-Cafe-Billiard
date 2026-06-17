<?php

namespace Tests\Feature;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerTestimonialTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_create_update_and_delete_their_testimonial(): void
    {
        $user = User::factory()->create(['role' => 'customer']);

        $this->actingAs($user)
            ->post('/customer/testimonials', [
                'message' => 'Pelayanan ramah dan suasana bagus.',
                'rating' => 5,
            ])
            ->assertRedirect('/customer/testimonials');

        $testimonial = Testimonial::where('user_id', $user->id)->firstOrFail();
        $this->assertSame('Pelayanan ramah dan suasana bagus.', $testimonial->message);
        $this->assertSame(5, $testimonial->rating);

        $this->actingAs($user)
            ->put("/customer/testimonials/{$testimonial->id}", [
                'message' => 'Sudah lebih baik setelah perbaikan.',
                'rating' => 4,
            ])
            ->assertRedirect('/customer/testimonials');

        $testimonial->refresh();
        $this->assertSame('Sudah lebih baik setelah perbaikan.', $testimonial->message);
        $this->assertSame(4, $testimonial->rating);

        $this->actingAs($user)
            ->delete("/customer/testimonials/{$testimonial->id}")
            ->assertRedirect('/customer/testimonials');

        $this->assertDatabaseMissing('testimonials', ['id' => $testimonial->id]);
    }
}
