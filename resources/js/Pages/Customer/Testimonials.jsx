import CustomerLayout from "@/Layouts/CustomerLayout";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Testimonials({ testimonials }) {
    const [editingId, setEditingId] = useState(null);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        message: "",
        rating: 5,
    });

    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            put(`/customer/testimonials/${editingId}`, {
                onSuccess: () => {
                    setEditingId(null);
                    reset("message", "rating");
                },
            });
            return;
        }

        post("/customer/testimonials", {
            onSuccess: () => reset("message", "rating"),
        });
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setData("message", item.message || "");
        setData("rating", item.rating || 5);
    };

    const renderStars = (value, onSelect) => (
        <div
            className="mt-2 flex items-center gap-1.5"
            role="radiogroup"
            aria-label="Pilih rating"
        >
            {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= value;
                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onSelect(star)}
                        className={`text-2xl transition-all duration-200 active:scale-95 ${active ? "text-[#ffcc00]" : "text-[#4b5660] hover:text-[#ffe17a]"}`}
                        aria-label={`${star} bintang`}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );

    const cancelEdit = () => {
        setEditingId(null);
        reset("message", "rating");
    };

    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#222727] pb-6">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Umpan Balik
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Testimoni Customer
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3] max-w-xl">
                        Bagikan pengalaman bermain billiard dan menikmati sajian kuliner QM Café dengan pengunjung lainnya.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0 self-start sm:self-center">
                    <span className="rounded-[10px] border border-[#222727] bg-[#111515] px-4 py-2.5 text-xs font-bold text-[#9aa7b3]">
                        Total Testimoni: <strong className="text-white">{(testimonials || []).length}</strong>
                    </span>
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
                {/* Form Card */}
                <section className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md">
                    <div className="flex items-center justify-between gap-3 border-b border-[#222727] pb-4">
                        <h2 className="text-base font-extrabold text-white tracking-wide">
                            {editingId ? "Edit Testimoni" : "Buat Testimoni Baru"}
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

                    <form onSubmit={submit} className="mt-6 grid gap-5">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                                Rating Penilaian
                            </span>
                            {renderStars(data.rating, (value) =>
                                setData("rating", value),
                            )}
                            <p className="mt-1.5 text-[11px] text-[#5b6e6e] font-bold">
                                Klik pada bintang untuk memberikan nilai pelayanan kami.
                            </p>
                            {errors.rating && (
                                <p className="mt-1.5 text-xs font-bold text-red-400">
                                    {errors.rating}
                                </p>
                            )}
                        </div>

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#9aa7b3]">
                                Pesan Ulasan
                            </span>
                            <textarea
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                                rows="4"
                                className="mt-2.5 w-full rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-3 text-sm text-white focus:border-[#ffcc00] focus:outline-none transition-all duration-200"
                                placeholder="Ceritakan pengalaman Anda di QM Cafe & Billiard..."
                            />
                            {errors.message && (
                                <p className="mt-1.5 text-xs font-bold text-red-400">
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-[10px] bg-[#ffcc00] px-5 py-3 text-xs font-bold text-[#151919] hover:bg-[#e6b800] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 shadow-md shadow-black/20"
                        >
                            {editingId ? "Simpan Perubahan" : "Kirim Ulasan Anda"}
                        </button>
                    </form>
                </section>

                {/* Guide Card */}
                <aside className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 shadow-md h-fit">
                    <h2 className="text-base font-extrabold text-white tracking-wide border-b border-[#222727] pb-4">
                        Panduan Penulisan
                    </h2>
                    <ul className="mt-4 space-y-4 text-xs text-[#9aa7b3]">
                        <li className="flex gap-2.5 items-start">
                            <span className="text-[#ffcc00] font-black">•</span>
                            <p className="leading-relaxed">
                                Testimoni Anda akan ditampilkan di halaman publik QM Café setelah disimpan agar dapat dilihat pelanggan lain.
                            </p>
                        </li>
                        <li className="flex gap-2.5 items-start">
                            <span className="text-[#ffcc00] font-black">•</span>
                            <p className="leading-relaxed">
                                Anda berhak untuk mengedit kembali ulasan atau menghapusnya secara permanen kapan saja.
                            </p>
                        </li>
                        <li className="flex gap-2.5 items-start">
                            <span className="text-[#ffcc00] font-black">•</span>
                            <p className="leading-relaxed">
                                Berikan penilaian yang objektif mengenai kenyamanan meja billiard, cita rasa makanan, dan kualitas servis kami.
                            </p>
                        </li>
                    </ul>
                </aside>
            </div>

            {/* Testimonials List Section */}
            <section className="mt-8 rounded-[15px] border border-[#222727] bg-gradient-to-b from-[#181d1d] to-[#111515] p-6 shadow-md">
                <h2 className="text-base font-extrabold text-white tracking-wide border-b border-[#222727] pb-4">
                    Ulasan Yang Pernah Anda Kirim
                </h2>
                <div className="mt-6 grid gap-4">
                    {(testimonials || []).length === 0 ? (
                        <div className="rounded-[12px] border border-dashed border-[#222727] bg-[#151919]/30 p-8 text-center text-xs text-[#9aa7b3]">
                            <svg className="mx-auto h-8 w-8 text-[#5b6e6e]/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Anda belum pernah mengirimkan testimoni. Gunakan panel di atas untuk mengirim testimoni pertama Anda.
                        </div>
                    ) : (
                        (testimonials || []).map((item) => (
                            <article
                                key={item.id}
                                className="rounded-[12px] border border-[#222727] bg-[#151919]/40 p-5 transition-all duration-300 hover:border-[#ffcc00]/10"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <div className="text-sm font-black text-[#ffcc00] tracking-wider">
                                            {"★".repeat(item.rating || 0)}
                                            {"☆".repeat(5 - (item.rating || 0))}
                                        </div>
                                        <p className="mt-3 text-sm text-[#e5edf3] font-serif italic leading-relaxed">
                                            “{item.message}”
                                        </p>
                                    </div>
                                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                                        {item.status}
                                    </span>
                                </div>
                                <div className="mt-5 pt-4 border-t border-[#222727]/40 flex flex-wrap gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(item)}
                                        className="rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2 text-xs font-bold text-[#9aa7b3] hover:border-[#ffcc00]/25 hover:text-white transition-all duration-200"
                                    >
                                        Edit Ulasan
                                    </button>
                                    <Link
                                        href={`/customer/testimonials/${item.id}`}
                                        method="delete"
                                        as="button"
                                        className="rounded-[10px] border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/15 transition-all duration-200"
                                    >
                                        Hapus
                                    </Link>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </section>
        </CustomerLayout>
    );
}

