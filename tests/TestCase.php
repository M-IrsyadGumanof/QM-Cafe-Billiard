<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        $stubModels = [
            'Faq',
            'Gallery',
            'Menu',
            'MenuCategory',
            'Order',
            'OrderItem',
            'Payment',
            'QmNotification',
            'Testimonial',
        ];
        foreach ($stubModels as $model) {
            $class = "App\\Models\\$model";
            if (!class_exists($class)) {
                eval('namespace App\Models; class ' . $model . ' extends \Illuminate\Database\Eloquent\Model { protected $guarded = []; }');
            }
        }

        parent::setUp();

        if (!\Illuminate\Support\Facades\Schema::hasTable('payments')) {
            \Illuminate\Support\Facades\Schema::create('payments', function ($table) {
                $table->id();
                $table->unsignedBigInteger('user_id')->nullable();
                $table->unsignedBigInteger('order_id')->nullable();
                $table->unsignedBigInteger('reservation_id')->nullable();
                $table->string('payment_code')->nullable();
                $table->string('payment_method')->default('transfer');
                $table->unsignedInteger('amount')->default(0);
                $table->string('proof_image')->nullable();
                $table->string('status')->default('pending');
                $table->unsignedBigInteger('verified_by')->nullable();
                $table->timestamp('verified_at')->nullable();
                $table->text('notes')->nullable();
                $table->timestamps();
            });
        }

        if (!\Illuminate\Support\Facades\Schema::hasTable('qm_notifications')) {
            \Illuminate\Support\Facades\Schema::create('qm_notifications', function ($table) {
                $table->id();
                $table->unsignedBigInteger('user_id')->nullable();
                $table->string('target_role')->nullable();
                $table->string('title')->nullable();
                $table->text('message')->nullable();
                $table->string('type')->default('info');
                $table->boolean('is_read')->default(false);
                $table->timestamps();
            });
        }
    }
}
