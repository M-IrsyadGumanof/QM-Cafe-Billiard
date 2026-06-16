import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { useForm, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Users({ users, filters }) {
    const rows = users?.data || [];
    const { auth } = usePage().props;

    // Filter states
    const [search, setSearch] = useState(filters?.search || "");
    const [role, setRole] = useState(filters?.role || "");
    const [status, setStatus] = useState(filters?.status || "");

    // Modal states
    const [editingUser, setEditingUser] = useState(null);
    const [resettingUser, setResettingUser] = useState(null);

    // Form for Adding Staff
    const staff = useForm({
        name: "",
        email: "",
        role: "kitchen_staff",
        password: "Password@12345",
        password_confirmation: "Password@12345",
    });

    const add = (e) => {
        e.preventDefault();
        staff.post("/admin/users", {
            onSuccess: () => {
                staff.reset();
            }
        });
    };

    // Form for Editing User
    const editForm = useForm({
        name: "",
        email: "",
        role: "",
        status: "",
    });

    const startEdit = (user) => {
        setEditingUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        editForm.patch(`/admin/users/${editingUser.id}`, {
            onSuccess: () => {
                setEditingUser(null);
                editForm.reset();
            }
        });
    };

    // Form for Resetting Password
    const resetForm = useForm({
        password: "Password@12345",
        password_confirmation: "Password@12345",
    });

    const startReset = (user) => {
        setResettingUser(user);
        resetForm.setData({
            password: "Password@12345",
            password_confirmation: "Password@12345",
        });
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        resetForm.patch(`/admin/users/${resettingUser.id}/reset-password`, {
            onSuccess: () => {
                setResettingUser(null);
                resetForm.reset();
            }
        });
    };

    // Search and Filters Logic
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters?.search || "")) {
                triggerFilter({ search, role, status });
            }
        }, 400);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const triggerFilter = (newFilters) => {
        router.get("/admin/users", {
            search: newFilters.search !== undefined ? newFilters.search : search,
            role: newFilters.role !== undefined ? newFilters.role : role,
            status: newFilters.status !== undefined ? newFilters.status : status,
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleRoleChange = (e) => {
        const val = e.target.value;
        setRole(val);
        triggerFilter({ role: val });
    };

    const handleStatusChange = (e) => {
        const val = e.target.value;
        setStatus(val);
        triggerFilter({ status: val });
    };

    const clearFilters = () => {
        setSearch("");
        setRole("");
        setStatus("");
        router.get("/admin/users", {}, { preserveState: true });
    };

    return (
        <AdminLayout>
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    System
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Users Management
                </h1>
                <p className="mt-1 text-xs text-[#9aa7b3]">
                    Kelola data staf (Admin, Kasir, Dapur) dan pelanggan QM Cafe &amp; Billiard.
                </p>
            </div>

            {/* Add Staff Form */}
            <div className="mt-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffcc00] mb-3 ml-1">
                    Tambah Staf Baru
                </h3>
                <form
                    onSubmit={add}
                    className="grid gap-3.5 rounded-[12px] border border-[#222727] bg-[#111515]/60 p-5 md:grid-cols-5"
                >
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Nama Staf</label>
                        <input
                            placeholder="John Doe"
                            value={staff.data.name}
                            onChange={(e) => staff.setData("name", e.target.value)}
                            className="modern-input"
                            required
                        />
                        {staff.errors.name && <p className="text-[10px] text-red-400 mt-0.5 ml-1">{staff.errors.name}</p>}
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={staff.data.email}
                            onChange={(e) => staff.setData("email", e.target.value)}
                            className="modern-input"
                            required
                        />
                        {staff.errors.email && <p className="text-[10px] text-red-400 mt-0.5 ml-1">{staff.errors.email}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Role</label>
                        <select
                            value={staff.data.role}
                            onChange={(e) => staff.setData("role", e.target.value)}
                            className="modern-select"
                            required
                        >
                            <option value="admin">Admin</option>
                            <option value="kitchen_staff">Kitchen Staff</option>
                            <option value="billiard_staff">Billiard Staff</option>
                            <option value="owner">Owner Staf</option>
                        </select>
                        {staff.errors.role && <p className="text-[10px] text-red-400 mt-0.5 ml-1">{staff.errors.role}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Password</label>
                        <input
                            type="text"
                            value={staff.data.password}
                            onChange={(e) => {
                                staff.setData("password", e.target.value);
                                staff.setData("password_confirmation", e.target.value);
                            }}
                            className="modern-input font-mono"
                            required
                        />
                        {staff.errors.password && <p className="text-[10px] text-red-400 mt-0.5 ml-1">{staff.errors.password}</p>}
                    </div>

                    <div className="flex items-end">
                        <button 
                            type="submit" 
                            disabled={staff.processing}
                            className="modern-btn-primary w-full h-[40px] flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Staff
                        </button>
                    </div>
                </form>
            </div>

            {/* Search and Filters Section */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#111515]/60 border border-[#222727] p-4 rounded-[12px]">
                <div className="w-full sm:w-72 relative">
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="modern-input w-full !pl-9"
                    />
                    <svg className="w-4 h-4 text-[#5b6e6e] absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                
                <div className="w-full sm:w-auto flex flex-wrap gap-3 items-center">
                    <select
                        value={role}
                        onChange={handleRoleChange}
                        className="modern-select min-w-[140px]"
                    >
                        <option value="">Semua Peran</option>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                        <option value="kitchen_staff">Kitchen Staff</option>
                        <option value="billiard_staff">Billiard Staff</option>
                        <option value="owner">Owner</option>
                    </select>
                    
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="modern-select min-w-[140px]"
                    >
                        <option value="">Semua Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                    </select>
                    
                    {(search || role || status) && (
                        <button
                            onClick={clearFilters}
                            className="rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2.5 text-xs font-bold text-[#9aa7b3] hover:text-[#ffcc00] hover:border-[#ffcc00]/25 transition-all duration-200"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>

            {/* Users Table */}
            <div className="mt-6 overflow-hidden rounded-[12px] border border-[#222727] shadow-sm bg-[#111515]/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-[#161a1a] border-b border-[#222727] text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3]">
                                <th className="px-5 py-4">Name</th>
                                <th className="px-5 py-4">Email</th>
                                <th className="px-5 py-4">Role</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Registered</th>
                                <th className="px-5 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#222727]/70">
                            {rows.length > 0 ? (
                                rows.map((u) => (
                                    <tr
                                        key={u.id}
                                        className="transition-colors duration-200 hover:bg-[#181d1d]/40"
                                    >
                                        <td className="px-5 py-4 font-bold text-white">{u.name}</td>
                                        <td className="px-5 py-4 text-slate-300 font-mono text-xs">{u.email}</td>
                                        <td className="px-5 py-4">
                                            <span className="inline-flex items-center rounded-md bg-[#181d1d] px-2.5 py-1 text-xs font-bold text-slate-300 border border-[#222727] capitalize">
                                                {u.role?.replaceAll("_", " ")}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge value={u.status} />
                                        </td>
                                        <td className="px-5 py-4 text-slate-400 text-xs font-mono">
                                            {new Date(u.created_at).toLocaleDateString(
                                                "id-ID",
                                                { day: 'numeric', month: 'short', year: 'numeric' }
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => startEdit(u)}
                                                className="rounded-[8px] border border-[#222727] bg-[#151919] px-3 py-1.5 text-xs font-bold text-[#9aa7b3] hover:border-[#ffcc00]/25 hover:text-white transition-all duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => startReset(u)}
                                                className="rounded-[8px] border border-[#222727] bg-[#151919] px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-[#ffcc00]/10 transition-all duration-200"
                                            >
                                                Reset Password
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-5 py-12 text-center text-xs text-[#5b6e6e]">
                                        Tidak ada data pengguna
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Links */}
            {users?.links && users.links.length > 3 && (
                <div className="mt-6 flex justify-center items-center gap-1.5 border-t border-[#222727] pt-6">
                    {users.links.map((link, idx) => (
                        <button
                            key={idx}
                            disabled={!link.url || link.active}
                            onClick={() => router.visit(link.url)}
                            className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${
                                link.active
                                    ? "bg-[#ffcc00] text-[#151919] border-[#ffcc00] shadow-sm shadow-[#ffcc00]/10"
                                    : "bg-[#111515] text-[#9aa7b3] border-[#222727] hover:text-white hover:border-[#ffcc00]/20 disabled:opacity-40"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}

            {/* Modal Edit User */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[15px] border border-[#222727] bg-[#111515] p-6 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#222727] pb-3.5 mb-5">
                            <h3 className="text-sm font-extrabold text-white tracking-wide font-serif">
                                Edit Pengguna: {editingUser.name}
                            </h3>
                            <button
                                onClick={() => setEditingUser(null)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Nama</label>
                                <input
                                    placeholder="Nama Lengkap"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData("name", e.target.value)}
                                    className="modern-input w-full"
                                    required
                                />
                                {editForm.errors.name && <p className="text-xs text-red-400 mt-1">{editForm.errors.name}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={editForm.data.email}
                                    onChange={(e) => editForm.setData("email", e.target.value)}
                                    className="modern-input w-full"
                                    required
                                />
                                {editForm.errors.email && <p className="text-xs text-red-400 mt-1">{editForm.errors.email}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Role</label>
                                <select
                                    value={editForm.data.role}
                                    onChange={(e) => editForm.setData("role", e.target.value)}
                                    className="modern-select w-full"
                                    disabled={editingUser.id === auth.user?.id}
                                >
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                    <option value="kitchen_staff">Kitchen Staff</option>
                                    <option value="billiard_staff">Billiard Staff</option>
                                    <option value="owner">Owner</option>
                                </select>
                                {editingUser.id === auth.user?.id && (
                                    <p className="text-[9px] text-amber-500 italic mt-0.5 ml-1">
                                        Anda tidak dapat mengubah peran akun Anda sendiri.
                                    </p>
                                )}
                                {editForm.errors.role && <p className="text-xs text-red-400 mt-1">{editForm.errors.role}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Status</label>
                                <select
                                    value={editForm.data.status}
                                    onChange={(e) => editForm.setData("status", e.target.value)}
                                    className="modern-select w-full"
                                    disabled={editingUser.id === auth.user?.id}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                                {editingUser.id === auth.user?.id && (
                                    <p className="text-[9px] text-amber-500 italic mt-0.5 ml-1">
                                        Anda tidak dapat menonaktifkan akun Anda sendiri.
                                    </p>
                                )}
                                {editForm.errors.status && <p className="text-xs text-red-400 mt-1">{editForm.errors.status}</p>}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="flex-1 rounded-[10px] border border-[#2b3232] bg-[#151919] px-4 py-2.5 text-xs font-bold text-[#c7d0d8] hover:bg-slate-800 transition-all duration-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="flex-1 modern-btn-primary text-xs"
                                >
                                    {editForm.processing ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Reset Password */}
            {resettingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[15px] border border-[#222727] bg-[#111515] p-6 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#222727] pb-3.5 mb-5">
                            <h3 className="text-sm font-extrabold text-white tracking-wide font-serif">
                                Reset Password: {resettingUser.name}
                            </h3>
                            <button
                                onClick={() => setResettingUser(null)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Password Baru</label>
                                <input
                                    type="text"
                                    value={resetForm.data.password}
                                    onChange={(e) => {
                                        resetForm.setData("password", e.target.value);
                                        resetForm.setData("password_confirmation", e.target.value);
                                    }}
                                    className="modern-input w-full font-mono"
                                    required
                                />
                                {resetForm.errors.password && <p className="text-xs text-red-400 mt-1">{resetForm.errors.password}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#9aa7b3] ml-1">Konfirmasi Password Baru</label>
                                <input
                                    type="text"
                                    value={resetForm.data.password_confirmation}
                                    onChange={(e) => resetForm.setData("password_confirmation", e.target.value)}
                                    className="modern-input w-full font-mono"
                                    required
                                />
                                {resetForm.errors.password_confirmation && <p className="text-xs text-red-400 mt-1">{resetForm.errors.password_confirmation}</p>}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setResettingUser(null)}
                                    className="flex-1 rounded-[10px] border border-[#2b3232] bg-[#151919] px-4 py-2.5 text-xs font-bold text-[#c7d0d8] hover:bg-slate-800 transition-all duration-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={resetForm.processing}
                                    className="flex-1 modern-btn-primary text-xs"
                                >
                                    {resetForm.processing ? "Mereset..." : "Reset Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
