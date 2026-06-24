import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { useForm, router } from "@inertiajs/react";
import { useState } from "react";

export default function Faq({ faqs }) {
    const rows = faqs?.data || [];
    const [editingId, setEditingId] = useState(null);

    const f = useForm({
        question: "",
        answer: "",
        category: "General",
        status: "active",
    });

    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            f.patch(`/admin/faq/${editingId}`, {
                onSuccess: () => {
                    setEditingId(null);
                    f.reset();
                }
            });
            return;
        }

        f.post("/admin/faq", {
            onSuccess: () => f.reset()
        });
    };

    const startEdit = (q) => {
        setEditingId(q.id);
        f.setData({
            question: q.question,
            answer: q.answer,
            category: q.category,
            status: q.status,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        f.reset();
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus FAQ ini?")) {
            router.delete(`/admin/faq/${id}`);
        }
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Pusat Informasi
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Manajemen FAQ
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Kelola daftar tanya jawab FAQ yang dapat diakses oleh pelanggan di halaman depan.
                </p>
            </div>

            {/* Form Section */}
            <section className="mt-8 rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                <div className="flex items-center justify-between gap-3 border-b border-[#222727] pb-4">
                    <h2 className="text-sm font-extrabold text-white tracking-wide">
                        {editingId ? "Edit Pertanyaan FAQ" : "Tambah FAQ Baru"}
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
                    <div className="flex flex-col md:col-span-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Pertanyaan</span>
                        <input
                            type="text"
                            placeholder="Contoh: Bagaimana cara memesan meja reguler?"
                            value={f.data.question}
                            onChange={(e) => f.setData("question", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.question && <p className="mt-1 text-xs text-red-400">{f.errors.question}</p>}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Kategori</span>
                        <select
                            value={f.data.category}
                            onChange={(e) => f.setData("category", e.target.value)}
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        >
                            <option>General</option>
                            <option>Food & Drink Order</option>
                            <option>Billiard Reservation</option>
                            <option>Payment</option>
                            <option>Booking Policy</option>
                        </select>
                        {f.errors.category && <p className="mt-1 text-xs text-red-400">{f.errors.category}</p>}
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

                    <div className="flex flex-col md:col-span-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">Jawaban</span>
                        <textarea
                            placeholder="Tuliskan jawaban penjelasan secara lengkap..."
                            value={f.data.answer}
                            onChange={(e) => f.setData("answer", e.target.value)}
                            rows="2"
                            className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                            required
                        />
                        {f.errors.answer && <p className="mt-1 text-xs text-red-400">{f.errors.answer}</p>}
                    </div>

                    <div className="md:col-span-3 mt-2">
                        <button
                            type="submit"
                            disabled={f.processing}
                            className="w-full rounded-[10px] bg-[#ffcc00] px-5 py-3 text-xs font-bold text-[#151919] hover:bg-[#e6b800] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 shadow-md shadow-black/20"
                        >
                            {editingId ? "Simpan Perubahan FAQ" : "Tambah FAQ"}
                        </button>
                    </div>
                </form>
            </section>

            {/* List Section */}
            <div className="mt-8 border-b border-[#222727] pb-3">
                <h3 className="text-base font-extrabold text-white tracking-wide">Daftar FAQ Saat Ini</h3>
            </div>

            <div className="mt-6 grid gap-4">
                {rows.length > 0 ? (
                    rows.map((q) => (
                        <div
                            className="group relative flex flex-col justify-between rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg md:flex-row md:items-center"
                            key={q.id}
                        >
                            <div className="space-y-1.5 flex-1 pr-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h4 className="font-extrabold text-base text-white tracking-wide">{q.question}</h4>
                                    <StatusBadge value={q.status} />
                                </div>
                                <p className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider">
                                    Kategori: {q.category}
                                </p>
                                <p className="text-sm text-[#c7d0d8] leading-relaxed pr-6">{q.answer}</p>
                            </div>

                            <div className="mt-4 flex gap-2.5 md:mt-0 md:justify-end shrink-0">
                                <button
                                    onClick={() => startEdit(q)}
                                    className="rounded-[10px] border border-[#222727] bg-[#151919] px-3.5 py-1.5 text-xs font-bold text-[#9aa7b3] hover:border-[#ffcc00]/25 hover:text-white transition-all duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(q.id)}
                                    className="rounded-[10px] border border-red-500/20 bg-red-500/5 px-3.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/15 transition-all duration-200"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-[15px] border border-dashed border-[#222727] p-12 text-center bg-[#151919]/20 text-sm text-[#9aa7b3]">
                        Belum ada data FAQ terdaftar.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
