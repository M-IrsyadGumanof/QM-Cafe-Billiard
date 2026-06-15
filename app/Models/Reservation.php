<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Reservation extends Model { protected $fillable=['user_id','billiard_table_id','billiard_package_id','reservation_code','package_type','reservation_date','start_time','end_time','duration_minutes','actual_start_time','actual_end_time','actual_duration_minutes','total_price','booking_status','payment_status','notes']; protected $casts=['reservation_date'=>'date','actual_start_time'=>'datetime','actual_end_time'=>'datetime']; public function user(): BelongsTo { return $this->belongsTo(User::class); } public function table(): BelongsTo { return $this->belongsTo(BilliardTable::class,'billiard_table_id'); } public function package(): BelongsTo { return $this->belongsTo(BilliardPackage::class,'billiard_package_id'); } public function payments(): HasMany { return $this->hasMany(Payment::class); } }
