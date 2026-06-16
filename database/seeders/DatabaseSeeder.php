<?php

namespace Database\Seeders;

use App\Models\BilliardPackage;
use App\Models\BilliardTable;
use App\Models\Faq;
use App\Models\Gallery;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\QmNotification;
use App\Models\Reservation;
use App\Models\Testimonial;
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
            Menu::updateOrCreate(['slug'=>Str::slug($name)], [
                'menu_category_id'=>$category->id,
                'name'=>$name,
                'description'=>$description,
                'price'=>$price,
                'stock'=>$stock,
                'status'=>'available',
            ]);
        }

        foreach ([
            ['TBL-01','Table 1','available','Meja dekat area utama.'],
            ['TBL-02','Table 2','reserved','Meja sudah dipesan pada jam tertentu.'],
            ['TBL-03','Table 3','occupied','Meja sedang digunakan.'],
            ['TBL-04','Table 4','maintenance','Meja sedang maintenance.'],
            ['TBL-05','Table 5','available','Meja dekat cafe bar.'],
            ['TBL-06','Table 6','available','Meja untuk sesi regular dan personal.'],
        ] as [$number,$name,$status,$desc]) {
            BilliardTable::updateOrCreate(['table_number'=>$number], [
                'name'=>$name,
                'status'=>$status,
                'description'=>$desc,
            ]);
        }

        foreach ([
            ['Regular 1 Hour','regular',60,40000,'Durasi tetap 1 jam, bayar di awal, aktif setelah pembayaran diverifikasi.'],
            ['Regular 2 Hours','regular',120,75000,'Durasi tetap 2 jam, cocok untuk reservasi terjadwal.'],
            ['Regular 3 Hours','regular',180,110000,'Durasi tetap 3 jam dengan harga lebih hemat.'],
            ['Personal Package','personal',null,40000,'Main dulu, bayar setelah selesai berdasarkan durasi aktual.'],
        ] as [$name,$type,$duration,$price,$desc]) {
            BilliardPackage::updateOrCreate(['name'=>$name], [
                'type'=>$type,
                'duration_minutes'=>$duration,
                'price'=>$price,
                'description'=>$desc,
                'status'=>'active',
            ]);
        }

        $faqs = [
            ['General','Apa itu QM Cafe & Billiard?','QM Cafe & Billiard adalah tempat nongkrong, makan, minum, dan bermain billiard dengan sistem reservasi online.'],
            ['Food & Drink Order','Apakah harus login untuk memesan makanan/minuman?','Ya, customer harus login agar pesanan dan riwayat transaksi dapat tercatat.'],
            ['Billiard Reservation','Apa perbedaan Regular Package dan Personal Package?','Regular Package memiliki durasi tetap dan dibayar di awal. Personal Package memungkinkan customer main dulu dan bayar setelah selesai.'],
            ['Payment','Bagaimana cara pembayaran transfer/QRIS diverifikasi?','Customer mengunggah bukti pembayaran, lalu Admin/Cashier melakukan verifikasi manual.'],
            ['Booking Policy','Kapan booking regular aktif?','Booking regular aktif setelah bukti pembayaran diverifikasi oleh Admin/Cashier.'],
            ['Booking Policy','Apakah reservasi bisa dibatalkan?','Pembatalan mengikuti kebijakan admin dan dapat dilihat pada status reservasi.'],
        ];
        foreach ($faqs as [$cat,$q,$a]) Faq::updateOrCreate(['question'=>$q], ['category'=>$cat,'answer'=>$a,'status'=>'active']);

        foreach ([
            ['Billiard Lounge','Area billiard dengan suasana premium dan nyaman.'],
            ['Cafe Area','Area cafe untuk makan dan nongkrong.'],
            ['Food & Drinks','Pilihan menu makanan dan minuman.'],
        ] as [$title,$desc]) Gallery::updateOrCreate(['title'=>$title], ['description'=>$desc,'status'=>'active']);

        foreach ([
            ['Budi Santoso','Tempatnya nyaman, reservasi meja jadi lebih mudah.',5],
            ['Siti Rahma','Menu cafe enak dan cocok untuk nongkrong sambil main billiard.',5],
            ['Andi Putra','Sistem pembayaran dan booking-nya jelas.',4],
        ] as [$name,$message,$rating]) Testimonial::updateOrCreate(['name'=>$name], ['message'=>$message,'rating'=>$rating,'status'=>'active']);

        $customer = User::where('email','customer@qmcafe.com')->first();
        $menu1 = Menu::where('slug','nasi-goreng-special')->first();
        $menu2 = Menu::where('slug','kopi-susu')->first();
        $order = Order::updateOrCreate(['order_code'=>'ORD-'.now()->format('Ymd').'-0001'], [
            'user_id'=>$customer->id,
            'total_amount'=>61000,
            'order_status'=>'processing',
            'payment_status'=>'verified',
            'payment_method'=>'qris',
            'notes'=>'Demo order untuk presentasi.',
        ]);
        OrderItem::updateOrCreate(['order_id'=>$order->id,'menu_id'=>$menu1->id], ['menu_name'=>$menu1->name,'price'=>$menu1->price,'quantity'=>1,'subtotal'=>$menu1->price]);
        OrderItem::updateOrCreate(['order_id'=>$order->id,'menu_id'=>$menu2->id], ['menu_name'=>$menu2->name,'price'=>$menu2->price,'quantity'=>2,'subtotal'=>$menu2->price*2]);

        $reservation = Reservation::updateOrCreate(['reservation_code'=>'RSV-'.now()->format('Ymd').'-0001'], [
            'user_id'=>$customer->id,
            'billiard_table_id'=>BilliardTable::where('table_number','TBL-01')->first()->id,
            'billiard_package_id'=>BilliardPackage::where('name','Regular 2 Hours')->first()->id,
            'package_type'=>'regular',
            'reservation_date'=>now()->toDateString(),
            'start_time'=>'19:00',
            'end_time'=>'21:00',
            'duration_minutes'=>120,
            'total_price'=>75000,
            'booking_status'=>'confirmed',
            'payment_status'=>'verified',
            'notes'=>'Demo reservation untuk presentasi.',
        ]);

        Payment::updateOrCreate(['payment_code'=>'PAY-'.now()->format('Ymd').'-0001'], [
            'user_id'=>$customer->id,
            'order_id'=>$order->id,
            'amount'=>$order->total_amount,
            'payment_method'=>'qris',
            'status'=>'verified',
            'verified_by'=>User::where('email','admin@qmcafe.com')->first()->id,
            'verified_at'=>now(),
            'notes'=>'Demo payment order.',
        ]);
        Payment::updateOrCreate(['payment_code'=>'PAY-'.now()->format('Ymd').'-0002'], [
            'user_id'=>$customer->id,
            'reservation_id'=>$reservation->id,
            'amount'=>$reservation->total_price,
            'payment_method'=>'transfer',
            'status'=>'verified',
            'verified_by'=>User::where('email','admin@qmcafe.com')->first()->id,
            'verified_at'=>now(),
            'notes'=>'Demo payment reservation.',
        ]);

        foreach ([
            ['admin', 'New Payment Verified', 'Pembayaran demo telah diverifikasi.'],
            ['customer', 'Reservation Confirmed', 'Reservasi billiard Anda telah dikonfirmasi.'],
            ['kitchen_staff', 'New Order', 'Ada order makanan/minuman yang perlu diproses.'],
        ] as [$role,$title,$message]) {
            QmNotification::create(['target_role'=>$role,'title'=>$title,'message'=>$message,'type'=>'info']);
        }
    }
}
