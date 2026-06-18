<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_is_accessible(): void
    {
        $this->get('/')->assertOk();
    }

    public function test_about_page_is_accessible(): void
    {
        $this->get('/about')->assertOk();
    }

    public function test_contact_page_is_accessible(): void
    {
        $this->get('/contact')->assertOk();
    }

    public function test_menu_page_is_accessible(): void
    {
        $this->get('/menu')->assertOk();
    }

    public function test_billiard_packages_page_is_accessible(): void
    {
        $this->get('/billiard-packages')->assertOk();
    }

    public function test_table_availability_page_is_accessible(): void
    {
        $this->get('/table-availability')->assertOk();
    }

    public function test_gallery_page_is_accessible(): void
    {
        $this->get('/gallery')->assertOk();
    }

    public function test_faq_page_is_accessible(): void
    {
        $this->get('/faq')->assertOk();
    }

    public function test_testimonials_page_is_accessible(): void
    {
        $this->get('/testimonials')->assertOk();
    }
}
