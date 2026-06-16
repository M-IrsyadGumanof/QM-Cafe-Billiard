<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Payment extends Model { protected $fillable=['user_id','order_id','reservation_id','payment_code','payment_method','amount','proof_image','status','verified_by','verified_at','notes']; protected $casts=['verified_at'=>'datetime']; public function user(): BelongsTo { return $this->belongsTo(User::class); } public function order(): BelongsTo { return $this->belongsTo(Order::class); } public function reservation(): BelongsTo { return $this->belongsTo(Reservation::class); } public function verifier(): BelongsTo { return $this->belongsTo(User::class,'verified_by'); } }
