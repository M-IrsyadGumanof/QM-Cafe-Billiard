<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('billiard_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('type')->index();
            $table->unsignedInteger('duration_minutes')->nullable();
            $table->unsignedInteger('price')->default(0);
            $table->text('description')->nullable();
            $table->string('status')->default('active')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('billiard_packages');
    }
};
