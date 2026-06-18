import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { useForm, router } from "@inertiajs/react";
import { useState } from "react";

export default function BilliardTables({ tables }) {
    const rows = tables?.data || [];
    const [editingId, setEditingId] = useState(null);

    const f = useForm({
        table_number: "",
        name: "",
        status: "available",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            f.patch(`/admin/billiard-tables/${editingId}`, {
                onSuccess: () => {
                    setEditingId(null);
                    f.reset();
                }
            });
            return;
        }

        f.post("/admin/billiard-tables", {
            onSuccess: () => f.reset()
        });
    };

    const startEdit = (t) => {
        setEditingId(t.id);
        f.setData({
            table_number: t.table_number,
            name: t.name,
            status: t.status,
            description: t.description || "",
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        f.reset();
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus meja billiard ini?")) {
            router.delete(`/admin/billiard-tables/${id}`);
        }
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Billiard & Café
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Manajemen Meja Billiard
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Kelola meja billiard yang terdaftar di sistem, atur status (Tersedia, Terbooking, Digunakan, Perawatan).
                </p>
            </div>

            {/* Form Section */}
            <section className="mt-8 rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                <div className="flex items-center justify-between gap-3 border-b border-[#222727] pb-4">
                    <h2 className="text-sm font-extrabold text-white tracking-wide">
                        {editingId ? "Edit Meja Billiard" : "Tambah Meja Baru"}
                    </h2>
                    {editingId && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="rounded-[10px] border border-[#222727] bg-[#151919] px-3.5 py-1.5 text-xs font-bold text-[#9aa7b3] hover:border-red-500/30 hover:text-red-400 transition-all duration-200"
                        >
                            Batal
                        </button>
                    )}
                </div>

                <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Nomor Meja</span>
                        <input
                            type="text"
                            placeholder="Contoh: 01"
                            value={f.data.table_number}
                            onChange={(e) => f.setData("table_number", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.table_number && <p className="mt-1 text-xs text-red-400">{f.errors.table_number}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Nama / Kode Meja</span>
                        <input
                            type="text"
                            placeholder="Contoh: Meja Standar A"
                            value={f.data.name}
                            onChange={(e) => f.setData("name", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.name && <p className="mt-1 text-xs text-red-400">{f.errors.name}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Status Meja</span>
                        <select
                            value={f.data.status}
                            onChange={(e) => f.setData("status", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        >
                            <option value="available">Tersedia (Available)</option>
                            <option value="reserved">Terbooking (Reserved)</option>
                            <option value="occupied">Digunakan (Occupied)</option>
                            <option value="maintenance">Perawatan (Maintenance)</option>
                        </select>
                        {f.errors.status && <p className="mt-1 text-xs text-red-400">{f.errors.status}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Keterangan</span>
                        <input
                            type="text"
                            placeholder="Contoh: Meja ukuran 9 feet"
                            value={f.data.description}
                            onChange={(e) => f.setData("description", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                        />
                        {f.errors.description && <p className="mt-1 text-xs text-red-400">{f.errors.description}</p>}
                    </div>

                    <div className="md:col-span-2 lg:col-span-4 mt-2">
                        <button
                            type="submit"
                            disabled={f.processing}
                            className="w-full rounded-[10px] bg-[#ffcc00] px-5 py-3 text-xs font-bold text-[#151919] hover:bg-[#e6b800] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 shadow-md shadow-black/20"
                        >
                            {editingId ? "Simpan Perubahan Meja" : "Tambah Meja Billiard"}
                        </button>
                    </div>
                </form>
            </section>

            {/* List Section */}
            <div className="mt-8 border-b border-[#222727] pb-3">
                <h3 className="text-base font-extrabold text-white tracking-wide">Daftar Meja Billiard</h3>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rows.length > 0 ? (
                    rows.map((t) => (
                        <div
                            key={t.id}
                            className="group relative flex flex-col justify-between rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg"
                        >
                            <div>
                                <div className="flex justify-between items-start gap-3">
                                    <div>
                                        <span className="font-mono text-xs font-bold text-[#5b6e6e] block mb-0.5">MEJA #{t.table_number}</span>
                                        <h3 className="font-extrabold text-base text-white tracking-wide">{t.name}</h3>
                                    </div>
                                    <StatusBadge value={t.status} />
                                </div>
                                <p className="mt-3 text-xs text-[#9aa7b3] leading-relaxed">
                                    {t.description || "Tidak ada rincian keterangan meja."}
                                </p>
                            </div>

                            <div className="mt-5 pt-4 border-t border-[#222727] flex gap-2.5">
                                <button
                                    onClick={() => startEdit(t)}
                                    className="flex-1 rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:border-[#ffcc00]/25 hover:text-white transition-all duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="rounded-[10px] border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/15 transition-all duration-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20 text-sm text-[#9aa7b3]">
                        Belum ada meja billiard terdaftar.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
