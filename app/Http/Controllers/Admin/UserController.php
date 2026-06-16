<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
class UserController extends Controller {
 public function index(Request $request): Response { $users=User::query()->when($request->search,fn($q,$v)=>$q->where(fn($qq)=>$qq->where('name','like',"%$v%")->orWhere('email','like',"%$v%")))->when($request->role,fn($q,$v)=>$q->where('role',$v))->when($request->status,fn($q,$v)=>$q->where('status',$v))->latest()->paginate(10)->withQueryString(); return Inertia::render('Admin/Users',['users'=>$users,'filters'=>$request->only('search','role','status')]); }
 public function store(Request $request): RedirectResponse { $data=$request->validate(['name'=>'required|string|max:255','email'=>'required|email|unique:users,email','role'=>'required|in:admin,kitchen_staff,billiard_staff,owner','password'=>['required','confirmed',Rules\Password::defaults()]]); User::create(['name'=>$data['name'],'email'=>$data['email'],'role'=>$data['role'],'status'=>'active','password'=>Hash::make($data['password'])]); return back()->with('success','Staff berhasil ditambahkan.'); }
 public function update(Request $request, User $user): RedirectResponse { $data=$request->validate(['name'=>'required|string|max:255','email'=>'required|email|unique:users,email,'.$user->id,'role'=>'required|in:customer,admin,kitchen_staff,billiard_staff,owner','status'=>'required|in:active,inactive,suspended']); if($user->id===auth()->id() && ($data['role']!=='admin' || $data['status']!=='active')) return back()->with('error','Tidak boleh menurunkan akses akun sendiri.'); $user->update($data); return back()->with('success','User berhasil diperbarui.'); }
 public function resetPassword(Request $request, User $user): RedirectResponse { $data=$request->validate(['password'=>['required','confirmed',Rules\Password::defaults()]]); $user->update(['password'=>Hash::make($data['password'])]); return back()->with('success','Password berhasil direset.'); }
}
