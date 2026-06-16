<?php

namespace Tests\Feature;

use App\Models\Gallery;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomePageContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_returns_gallery_and_testimonials_preview(): void
    {
        $user = User::factory()->create(['role' => 'customer']);

        Gallery::create([
            'title' => 'Studio',
            'image' => 'gallery/studio.jpg',
            'description' => 'Spotlight',
            'status' => 'active',
        ]);

        Testimonial::create([
            'user_id' => $user->id,
            'name' => $user->name,
            'message' => 'Tempatnya nyaman',
            'rating' => 5,
            'status' => 'active',
        ]);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Public/Home')
                ->has('galleries', 1)
                ->has('testimonials', 1)
            );
    }
}
