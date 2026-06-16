<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class BilliardTable extends Model { protected $fillable=['table_number','name','status','description']; public function reservations(): HasMany { return $this->hasMany(Reservation::class); } }
