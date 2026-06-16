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
            $table->foreignId('user_id')->constrained()->cascadeOnUpdate();
            $table->foreignId('billiard_table_id')->constrained()->cascadeOnUpdate();
            $table->foreignId('billiard_package_id')->constrained()->cascadeOnUpdate();
            $table->string('reservation_code')->unique();
            $table->string('package_type')->index();
            $table->date('reservation_date');
            $table->time('start_time');
            $table->time('end_time')->nullable();
            $table->unsignedInteger('duration_minutes')->nullable();
            $table->dateTime('actual_start_time')->nullable();
            $table->dateTime('actual_end_time')->nullable();
            $table->unsignedInteger('actual_duration_minutes')->nullable();
            $table->unsignedInteger('total_price')->default(0);
            $table->string('booking_status')->default('pending')->index();
            $table->string('payment_status')->default('unpaid')->index();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
