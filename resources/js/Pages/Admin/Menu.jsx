import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";
import { useForm, router } from "@inertiajs/react";
import { useState } from "react";

export default function Menu({ menus, categories }) {
    const rows = menus?.data || [];
    const [editingId, setEditingId] = useState(null);

    const f = useForm({
        menu_category_id: categories?.[0]?.id || "",
        name: "",
        description: "",
        price: "",
        stock: "",
        status: "available",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            f.post(`/admin/menu/${editingId}`, {
                forceFormData: true,
                onSuccess: () => {
                    setEditingId(null);
                    f.reset();
                }
            });
            return;
        }

        f.post("/admin/menu", {
            forceFormData: true,
            onSuccess: () => f.reset(),
        });
    };

    const startEdit = (m) => {
        setEditingId(m.id);
        f.setData({
            _method: 'PATCH',
            menu_category_id: m.menu_category_id,
            name: m.name,
            description: m.description || "",
            price: m.price,
            stock: m.stock,
            status: m.status,
            image: null,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        f.reset();
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
            router.delete(`/admin/menu/${id}`);
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
                    Manajemen Menu Café
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Kelola menu kuliner café, atur stok, ganti foto, harga, dan ketersediaan makanan/minuman.
                </p>
            </div>

            {/* Form Section */}
            <section className="mt-8 rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                <div className="flex items-center justify-between gap-3 border-b border-[#222727] pb-4">
                    <h2 className="text-sm font-extrabold text-white tracking-wide">
                        {editingId ? "Edit Item Menu" : "Tambah Menu Baru"}
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

                <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Nama Menu</span>
                        <input
                            type="text"
                            placeholder="Contoh: Nasi Goreng Special"
                            value={f.data.name}
                            onChange={(e) => f.setData("name", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.name && <p className="mt-1 text-xs text-red-400">{f.errors.name}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Kategori</span>
                        <select
                            value={f.data.menu_category_id}
                            onChange={(e) => f.setData("menu_category_id", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        >
                            {(categories || []).map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {f.errors.menu_category_id && <p className="mt-1 text-xs text-red-400">{f.errors.menu_category_id}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Harga (Rp)</span>
                        <input
                            type="number"
                            placeholder="Contoh: 25000"
                            value={f.data.price}
                            onChange={(e) => f.setData("price", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.price && <p className="mt-1 text-xs text-red-400">{f.errors.price}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Stok</span>
                        <input
                            type="number"
                            placeholder="Contoh: 50"
                            value={f.data.stock}
                            onChange={(e) => f.setData("stock", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.stock && <p className="mt-1 text-xs text-red-400">{f.errors.stock}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Status</span>
                        <select
                            value={f.data.status}
                            onChange={(e) => f.setData("status", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        >
                            <option value="available">Tersedia (Available)</option>
                            <option value="unavailable">Habis (Unavailable)</option>
                        </select>
                        {f.errors.status && <p className="mt-1 text-xs text-red-400">{f.errors.status}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Foto Menu</span>
                        <input
                            type="file"
                            onChange={(e) => f.setData("image", e.target.files[0])}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2.5 text-xs text-[#9aa7b3] file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#ffcc00] file:text-[#151919] file:hover:bg-[#e6b800] focus:outline-none transition-all duration-200"
                        />
                        {f.errors.image && <p className="mt-1 text-xs text-red-400">{f.errors.image}</p>}
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Deskripsi</span>
                        <textarea
                            placeholder="Tuliskan deskripsi rasa, komposisi, atau porsi..."
                            value={f.data.description}
                            onChange={(e) => f.setData("description", e.target.value)}
                            rows="2"
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                        />
                        {f.errors.description && <p className="mt-1 text-xs text-red-400">{f.errors.description}</p>}
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 mt-2">
                        <button
                            type="submit"
                            disabled={f.processing}
                            className="w-full rounded-[10px] bg-[#ffcc00] px-5 py-3 text-xs font-bold text-[#151919] hover:bg-[#e6b800] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 shadow-md shadow-black/20"
                        >
                            {editingId ? "Simpan Perubahan Menu" : "Tambah Item Menu"}
                        </button>
                    </div>
                </form>
            </section>

            {/* List Section */}
            <div className="mt-8 border-b border-[#222727] pb-3">
                <h3 className="text-base font-extrabold text-white tracking-wide">Daftar Menu Saat Ini</h3>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rows.length > 0 ? (
                    rows.map((m) => (
                        <div
                            key={m.id}
                            className="group relative flex flex-col justify-between rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg"
                        >
                            <div>
                                {/* Photo Container */}
                                <div className="mb-4 h-40 rounded-xl border border-[#222727] bg-[#151919] overflow-hidden flex items-center justify-center relative">
                                    {m.image ? (
                                        <img
                                            src={`/storage/${m.image}`}
                                            alt={m.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <svg className="w-12 h-12 text-[#ffcc00]/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    )}
                                </div>

                                <div className="flex justify-between gap-3 items-start">
                                    <h3 className="font-extrabold text-base leading-snug text-white tracking-wide">{m.name}</h3>
                                    <StatusBadge value={m.status} />
                                </div>

                                <p className="mt-1 text-xs font-bold text-[#5b6e6e] uppercase tracking-wider">
                                    {m.category?.name || "Tanpa Kategori"}
                                </p>

                                {m.description && (
                                    <p className="mt-2 text-xs text-[#9aa7b3] line-clamp-2 leading-relaxed">
                                        {m.description}
                                    </p>
                                )}

                                <div className="mt-4 flex items-end justify-between border-t border-[#222727]/50 pt-3">
                                    <div>
                                        <span className="text-[10px] text-[#5b6e6e] font-bold uppercase tracking-wider block">Harga</span>
                                        <span className="text-base font-black text-[#ffcc00]">
                                            {money(m.price)}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-[#c7d0d8]">
                                        Stok: <strong className="text-white font-mono">{m.stock}</strong>
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-[#222727] flex gap-2.5">
                                <button
                                    onClick={() => startEdit(m)}
                                    className="flex-1 rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:border-[#ffcc00]/25 hover:text-white transition-all duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(m.id)}
                                    className="rounded-[10px] border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/15 transition-all duration-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20 text-sm text-[#9aa7b3]">
                        Belum ada item menu kuliner terdaftar. Gunakan formulir di atas untuk mendaftarkan menu perdana.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
