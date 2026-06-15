<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('billiard_table_id')->constrained()->cascadeOnDelete();
            $table->foreignId('billiard_package_id')->constrained()->cascadeOnDelete();
            $table->string('reservation_code')->unique();
            $table->string('package_type');
            $table->date('reservation_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('duration_minutes');
            $table->datetime('actual_start_time')->nullable();
            $table->datetime('actual_end_time')->nullable();
            $table->integer('actual_duration_minutes')->nullable();
            $table->decimal('total_price', 10, 2)->default(0);
            $table->string('booking_status')->default('pending');
            $table->string('payment_status')->default('unpaid');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};