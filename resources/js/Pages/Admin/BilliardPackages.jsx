import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";
import { useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function BilliardPackages({ packages }) {
    const rows = packages?.data || [];
    const [editingId, setEditingId] = useState(null);

    const f = useForm({
        name: "",
        type: "regular",
        duration_minutes: "",
        price: "",
        description: "",
        status: "active",
    });

    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            f.patch(`/admin/billiard-packages/${editingId}`, {
                onSuccess: () => {
                    setEditingId(null);
                    f.reset();
                }
            });
            return;
        }

        f.post("/admin/billiard-packages", {
            onSuccess: () => f.reset()
        });
    };

    const startEdit = (p) => {
        setEditingId(p.id);
        f.setData({
            name: p.name,
            type: p.type,
            duration_minutes: p.duration_minutes || "",
            price: p.price,
            description: p.description || "",
            status: p.status,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        f.reset();
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus paket billiard ini?")) {
            router.delete(`/admin/billiard-packages/${id}`);
        }
    };

    // Watch type changes to handle duration field behavior
    useEffect(() => {
        if (f.data.type === "personal") {
            f.setData("duration_minutes", "");
        }
    }, [f.data.type]);

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Billiard & Café
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Manajemen Paket Billiard
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Kelola paket bermain billiard (Reguler / Personal), durasi paket, tarif/harga, dan deskripsi layanan.
                </p>
            </div>

            {/* Form Section */}
            <section className="mt-8 rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                <div className="flex items-center justify-between gap-3 border-b border-[#222727] pb-4">
                    <h2 className="text-sm font-extrabold text-white tracking-wide">
                        {editingId ? "Edit Paket Billiard" : "Tambah Paket Baru"}
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
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Nama Paket</span>
                        <input
                            type="text"
                            placeholder="Contoh: Paket 2 Jam Hemat"
                            value={f.data.name}
                            onChange={(e) => f.setData("name", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.name && <p className="mt-1 text-xs text-red-400">{f.errors.name}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Tipe Paket</span>
                        <select
                            value={f.data.type}
                            onChange={(e) => f.setData("type", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        >
                            <option value="regular">Reguler (Fixed duration)</option>
                            <option value="personal">Personal (Pay After Play)</option>
                        </select>
                        {f.errors.type && <p className="mt-1 text-xs text-red-400">{f.errors.type}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Durasi (Menit)</span>
                        <input
                            type="number"
                            placeholder={f.data.type === "personal" ? "Otomatis dihitung petugas" : "Contoh: 120"}
                            value={f.data.duration_minutes}
                            onChange={(e) => f.setData("duration_minutes", e.target.value)}
                            disabled={f.data.type === "personal"}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                            required={f.data.type === "regular"}
                        />
                        {f.errors.duration_minutes && <p className="mt-1 text-xs text-red-400">{f.errors.duration_minutes}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                            {f.data.type === "personal" ? "Tarif Per Jam (Rp)" : "Harga Paket (Rp)"}
                        </span>
                        <input
                            type="number"
                            placeholder="Contoh: 50000"
                            value={f.data.price}
                            onChange={(e) => f.setData("price", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.price && <p className="mt-1 text-xs text-red-400">{f.errors.price}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Status Paket</span>
                        <select
                            value={f.data.status}
                            onChange={(e) => f.setData("status", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        >
                            <option value="active">Aktif / Tampilkan (Active)</option>
                            <option value="inactive">Nonaktif / Sembunyikan (Inactive)</option>
                        </select>
                        {f.errors.status && <p className="mt-1 text-xs text-red-400">{f.errors.status}</p>}
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Deskripsi Paket</span>
                        <textarea
                            placeholder="Tuliskan keterangan detail mengenai paket bermain ini..."
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
                            {editingId ? "Simpan Perubahan Paket" : "Tambah Paket Billiard"}
                        </button>
                    </div>
                </form>
            </section>

            {/* List Section */}
            <div className="mt-8 border-b border-[#222727] pb-3 flex items-center justify-between">
                <h3 className="text-base font-extrabold text-white tracking-wide">Daftar Paket Billiard</h3>
                <span className="rounded-full bg-[#181d1d] border border-[#222727] px-3 py-1 text-[10px] font-bold text-[#ffcc00] uppercase tracking-wider">
                    Total: {packages?.total || 0} Paket
                </span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rows.length > 0 ? (
                    rows.map((p) => (
                        <div
                            key={p.id}
                            className="group relative flex flex-col justify-between rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg"
                        >
                            <div>
                                <div className="flex justify-between items-start gap-3">
                                    <div>
                                        <span className="font-mono text-[9px] font-black bg-[#ffcc00]/10 border border-[#ffcc00]/20 rounded-md px-2 py-0.5 text-[#ffcc00] uppercase tracking-wider block w-fit mb-2">
                                            {p.type === "personal" ? "Personal" : "Reguler"}
                                        </span>
                                        <h3 className="font-extrabold text-base text-white tracking-wide">{p.name}</h3>
                                    </div>
                                    <StatusBadge value={p.status} />
                                </div>
                                <p className="mt-3 text-xs text-[#9aa7b3] leading-relaxed">
                                    {p.description || "Tidak ada rincian keterangan paket."}
                                </p>

                                <div className="mt-4 flex items-end justify-between border-t border-[#222727]/50 pt-3">
                                    <div>
                                        <span className="text-[9px] text-[#5b6e6e] font-bold uppercase tracking-wider block">
                                            {p.type === "personal" ? "Tarif Per Jam" : "Harga Paket"}
                                        </span>
                                        <span className="text-base font-black text-[#ffcc00]">
                                            {money(p.price)}
                                            {p.type === "personal" && <strong className="text-xs text-[#9aa7b3] font-normal"> / jam</strong>}
                                        </span>
                                    </div>
                                    {p.type === "regular" && (
                                        <span className="text-xs font-bold text-[#c7d0d8]">
                                            Durasi: <strong className="text-white font-mono">{p.duration_minutes} mnt</strong>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-[#222727] flex gap-2.5">
                                <button
                                    onClick={() => startEdit(p)}
                                    className="flex-1 rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:border-[#ffcc00]/25 hover:text-white transition-all duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="rounded-[10px] border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/15 transition-all duration-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20 text-sm text-[#9aa7b3]">
                        Belum ada paket billiard terdaftar. Gunakan formulir di atas untuk mendaftarkan paket perdana.
                    </div>
                )}
            </div>

            {/* Pagination Links */}
            {packages?.links && packages.links.length > 3 && (
                <div className="mt-10 flex justify-center items-center gap-1.5 border-t border-[#222727] pt-6">
                    {packages.links.map((link, idx) => (
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
        </AdminLayout>
    );
}
