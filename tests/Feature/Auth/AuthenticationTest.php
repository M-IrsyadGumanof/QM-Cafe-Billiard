<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        session(['captcha' => 'abc123']);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
            'captcha' => 'abc123',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('home', absolute: false));
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        session(['captcha' => 'abc123']);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
            'captcha' => 'abc123',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_not_authenticate_with_invalid_captcha(): void
    {
        $user = User::factory()->create();

        session(['captcha' => 'abc123']);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
            'captcha' => 'wrong-captcha',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors('captcha');
    }

    public function test_users_can_not_authenticate_with_incorrect_case_captcha(): void
    {
        $user = User::factory()->create();

        session(['captcha' => 'ABC123']);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
            'captcha' => 'abc123',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors('captcha');
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
