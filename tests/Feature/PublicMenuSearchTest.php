<?php

namespace Tests\Feature;

use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicMenuSearchTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_menu_filters_by_category_and_search_query(): void
    {
        $this->markTestSkipped('Menunggu penyelesaian modul dari tim lain (route public menu).');
        
        $coffeeCategory = MenuCategory::create([
            'name' => 'Coffee',
            'slug' => 'coffee',
            'description' => 'Coffee',
            'status' => 'active',
        ]);

        $foodCategory = MenuCategory::create([
            'name' => 'Food',
            'slug' => 'food',
            'description' => 'Food',
            'status' => 'active',
        ]);

        Menu::create([
            'menu_category_id' => $coffeeCategory->id,
            'name' => 'Espresso',
            'slug' => 'espresso',
            'description' => 'Strong coffee',
            'price' => 20000,
            'stock' => 10,
            'status' => 'available',
        ]);

        Menu::create([
            'menu_category_id' => $foodCategory->id,
            'name' => 'Burger',
            'slug' => 'burger',
            'description' => 'Beef burger',
            'price' => 40000,
            'stock' => 10,
            'status' => 'available',
        ]);

        $response = $this->get('/menu?search=espresso&category=coffee');

        $response->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Public/Menu')
                ->where('menus', fn ($menus) => count($menus) === 1 && $menus[0]['name'] === 'Espresso')
            );
    }
}
