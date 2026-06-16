<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnUpdate();
            $table->string('order_code')->unique();
            $table->unsignedInteger('total_amount')->default(0);
            $table->string('order_status')->default('pending_payment')->index();
            $table->string('payment_status')->default('unpaid')->index();
            $table->string('payment_method')->default('transfer');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
