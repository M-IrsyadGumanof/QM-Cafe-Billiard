import AdminLayout from "@/Layouts/AdminLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { router } from "@inertiajs/react";

export default function Testimonials({ testimonials }) {
    const rows = testimonials?.data || [];

    const setStatus = (testimonial, status) => {
        router.patch(
            `/admin/testimonials/${testimonial.id}/status`,
            { status },
            {
                preserveScroll: true,
                onSuccess: () => router.visit("/admin/testimonials"),
            },
        );
    };

    const remove = (testimonial) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return;

        router.delete(`/admin/testimonials/${testimonial.id}`, {
            preserveScroll: true,
            onSuccess: () => router.visit("/admin/testimonials"),
        });
    };

    return (
        <AdminLayout>
            {/* Header Banner */}
            <div className="border-b border-[#222727] pb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                        Reviews
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                        Testimonial Management
                    </h1>
                    <p className="mt-1 text-xs text-[#9aa7b3]">
                        Tinjau, setujui, sembunyikan, atau hapus ulasan testimoni dari pelanggan.
                    </p>
                </div>
            </div>

            {/* Testimonials Grid */}
            <div className="mt-8">
                {rows.length === 0 ? (
                    <div className="rounded-[15px] border border-[#222727] bg-[#111515]/30 p-12 text-center">
                        <p className="text-sm text-[#5b6e6e]">Belum ada ulasan testimoni</p>
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2">
                        {rows.map((testimonial) => (
                            <article
                                key={testimonial.id}
                                className="rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-[#ffcc00]/10 hover:shadow-lg hover:shadow-black/20"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="font-bold text-white text-base font-sans leading-tight">
                                                {testimonial.name || testimonial.user?.name}
                                            </h3>
                                            <p className="text-xs text-[#9aa7b3] font-mono mt-1">
                                                {testimonial.user?.email || "Pengguna Terdaftar"}
                                            </p>
                                        </div>
                                        <StatusBadge value={testimonial.status} />
                                    </div>

                                    {/* Quote Text */}
                                    <div className="mt-4 text-[#ecf1f5] text-sm italic font-serif leading-relaxed border-l-2 border-[#ffcc00]/20 pl-3">
                                        "{testimonial.message}"
                                    </div>

                                    {/* Stars Rating */}
                                    <div className="mt-4 flex items-center gap-1.5">
                                        <div className="flex text-[#ffcc00]">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current text-[#ffcc00]' : 'text-[#4b5563]'}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.25.588 1.81l-3.97 2.881a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.881a1 1 0 00-1.176 0l-3.97 2.881c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.72c-.773-.56-.374-1.81.588-1.81h4.906a1 1 0 00.951-.69l1.519-4.674z"
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-[#9aa7b3] font-bold">
                                            {testimonial.rating} / 5
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#222727] justify-end">
                                    <button
                                        onClick={() => setStatus(testimonial, "active")}
                                        className="rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 transition-all duration-200"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => setStatus(testimonial, "pending")}
                                        className="rounded-lg bg-[#ffcc00]/10 hover:bg-[#ffcc00]/25 border border-[#ffcc00]/20 px-3 py-1.5 text-xs font-bold text-[#ffcc00] transition-all duration-200"
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => setStatus(testimonial, "inactive")}
                                        className="rounded-lg bg-slate-500/10 hover:bg-slate-500/25 border border-slate-500/20 px-3 py-1.5 text-xs font-bold text-slate-300 transition-all duration-200"
                                    >
                                        Hide
                                    </button>
                                    <button
                                        onClick={() => remove(testimonial)}
                                        className="rounded-lg bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 px-3 py-1.5 text-xs font-bold text-red-400 transition-all duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

