import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { useForm, router } from "@inertiajs/react";
import { useState } from "react";

export default function MenuCategories({ categories }) {
    const rows = categories?.data || [];
    const [editingId, setEditingId] = useState(null);

    const f = useForm({
        name: "",
        description: "",
        status: "active"
    });

    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            f.patch(`/admin/menu-categories/${editingId}`, {
                onSuccess: () => {
                    setEditingId(null);
                    f.reset();
                }
            });
            return;
        }

        f.post("/admin/menu-categories", {
            onSuccess: () => f.reset()
        });
    };

    const startEdit = (c) => {
        setEditingId(c.id);
        f.setData({
            name: c.name,
            description: c.description || "",
            status: c.status
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        f.reset();
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
            router.delete(`/admin/menu-categories/${id}`);
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
                    Kategori Menu
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Kelola pengelompokan menu masakan (contoh: makanan berat, minuman dingin, cemilan).
                </p>
            </div>

            {/* Form Section */}
            <section className="mt-8 rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                <div className="flex items-center justify-between gap-3 border-b border-[#222727] pb-4">
                    <h2 className="text-sm font-extrabold text-white tracking-wide">
                        {editingId ? "Edit Kategori" : "Tambah Kategori Baru"}
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

                <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Nama Kategori</span>
                        <input
                            type="text"
                            placeholder="Contoh: Makanan Berat"
                            value={f.data.name}
                            onChange={(e) => f.setData("name", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.name && <p className="mt-1 text-xs text-red-400">{f.errors.name}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Status</span>
                        <select
                            value={f.data.status}
                            onChange={(e) => f.setData("status", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        >
                            <option value="active">Aktif (Active)</option>
                            <option value="inactive">Nonaktif (Inactive)</option>
                        </select>
                        {f.errors.status && <p className="mt-1 text-xs text-red-400">{f.errors.status}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Keterangan / Deskripsi</span>
                        <input
                            type="text"
                            placeholder="Deskripsi singkat kategori..."
                            value={f.data.description}
                            onChange={(e) => f.setData("description", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                        />
                        {f.errors.description && <p className="mt-1 text-xs text-red-400">{f.errors.description}</p>}
                    </div>

                    <div className="md:col-span-3 mt-2">
                        <button
                            type="submit"
                            disabled={f.processing}
                            className="w-full rounded-[10px] bg-[#ffcc00] px-5 py-3 text-xs font-bold text-[#151919] hover:bg-[#e6b800] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 shadow-md shadow-black/20"
                        >
                            {editingId ? "Simpan Perubahan Kategori" : "Tambah Kategori"}
                        </button>
                    </div>
                </form>
            </section>

            {/* List Section */}
            <div className="mt-8 border-b border-[#222727] pb-3">
                <h3 className="text-base font-extrabold text-white tracking-wide">Kategori Terdaftar</h3>
            </div>

            <div className="mt-6 grid gap-4">
                {rows.length > 0 ? (
                    rows.map((c) => (
                        <div
                            key={c.id}
                            className="group relative flex flex-col justify-between rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg sm:flex-row sm:items-center"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-extrabold text-base text-white tracking-wide">{c.name}</h3>
                                    <StatusBadge value={c.status} />
                                </div>
                                <p className="text-xs text-[#9aa7b3]">
                                    {c.description || "Tidak ada deskripsi."}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2.5 sm:mt-0 sm:justify-end shrink-0">
                                <button
                                    onClick={() => startEdit(c)}
                                    className="rounded-[10px] border border-[#222727] bg-[#151919] px-3.5 py-1.5 text-xs font-bold text-[#9aa7b3] hover:border-[#ffcc00]/25 hover:text-white transition-all duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="rounded-[10px] border border-red-500/20 bg-red-500/5 px-3.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/15 transition-all duration-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20 text-sm text-[#9aa7b3]">
                        Belum ada kategori menu kuliner terdaftar.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
