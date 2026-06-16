<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Menu extends Model { protected $fillable=['menu_category_id','name','slug','description','price','image','stock','status']; public function category(): BelongsTo { return $this->belongsTo(MenuCategory::class,'menu_category_id'); } public function orderItems(): HasMany { return $this->hasMany(OrderItem::class); } }
