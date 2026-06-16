<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name'=>'QM Admin','email'=>'admin@qmcafe.com','password'=>'Admin@12345','role'=>'admin'],
            ['name'=>'Customer Demo','email'=>'customer@qmcafe.com','password'=>'Customer@12345','role'=>'customer'],
            ['name'=>'Kitchen Staff','email'=>'kitchen@qmcafe.com','password'=>'Kitchen@12345','role'=>'kitchen_staff'],
            ['name'=>'Billiard Staff','email'=>'billiard@qmcafe.com','password'=>'Billiard@12345','role'=>'billiard_staff'],
            ['name'=>'Owner QM','email'=>'owner@qmcafe.com','password'=>'Owner@12345','role'=>'owner'],
        ];

        foreach ($users as $data) {
            User::updateOrCreate(['email' => $data['email']], [
                'name' => $data['name'],
                'password' => Hash::make($data['password']),
                'role' => $data['role'],
                'status' => 'active',
                'email_verified_at' => now(),
            ]);
        }

        $categories = [
            ['name'=>'Coffee','description'=>'Kopi premium untuk teman bermain billiard.'],
            ['name'=>'Non Coffee','description'=>'Minuman segar tanpa kopi.'],
            ['name'=>'Main Course','description'=>'Menu utama cafe.'],
            ['name'=>'Snacks','description'=>'Camilan untuk sharing.'],
            ['name'=>'Dessert','description'=>'Menu manis penutup.'],
        ];

        foreach ($categories as $category) {
            MenuCategory::updateOrCreate(['slug'=>Str::slug($category['name'])], [
                'name'=>$category['name'],
                'description'=>$category['description'],
                'status'=>'active',
            ]);
        }

        $menuData = [
            ['Main Course','Nasi Goreng Special',25000,20,'Nasi goreng dengan telur, ayam, dan cita rasa khas QM.'],
            ['Main Course','Mie Goreng QM',22000,18,'Mie goreng pedas gurih untuk makan santai.'],
            ['Snacks','French Fries',18000,25,'Kentang goreng renyah dengan saus pilihan.'],
            ['Snacks','Chicken Wings',30000,15,'Sayap ayam crispy dengan saus barbeque.'],
            ['Non Coffee','Es Teh',8000,40,'Es teh manis segar.'],
            ['Coffee','Kopi Susu',18000,30,'Kopi susu creamy dengan rasa seimbang.'],
            ['Non Coffee','Matcha Latte',22000,20,'Matcha latte lembut dan segar.'],
            ['Dessert','Chocolate Pancake',24000,10,'Pancake coklat untuk penutup.'],
        ];

        foreach ($menuData as [$categoryName,$name,$price,$stock,$description]) {
            $category = MenuCategory::where('name', $categoryName)->first();
            if ($category) {
                Menu::updateOrCreate(['slug'=>Str::slug($name)], [
                    'menu_category_id'=>$category->id,
                    'name'=>$name,
                    'description'=>$description,
                    'price'=>$price,
                    'stock'=>$stock,
                    'status'=>'available',
                ]);
            }
        }
    }
}
