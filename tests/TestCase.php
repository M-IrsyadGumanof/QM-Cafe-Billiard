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
                eval("namespace App\Models; class $model extends \Illuminate\Database\Eloquent\Model {}");
            }
        }

        parent::setUp();
    }
}
