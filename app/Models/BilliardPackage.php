<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BilliardPackage extends Model
{
    protected $fillable = [
        'name',
        'type',
        'duration_minutes',
        'price',
        'description',
        'status',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}