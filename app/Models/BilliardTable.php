<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BilliardTable extends Model
{
    protected $fillable = [
        'table_number',
        'name',
        'status',
        'description',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}