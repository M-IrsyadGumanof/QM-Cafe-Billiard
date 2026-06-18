import PublicLayout from "@/Layouts/PublicLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";

export default function Testimonials({ testimonials }) {
    return (
        <PublicLayout>
            {/* Page Header */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Testimoni
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Testimonials
                </h1>
                <p className="mt-2 text-xs leading-5 text-[#9aa7b3] max-w-2xl">
                    Dengarkan langsung pengalaman pelanggan kami yang telah menikmati layanan QM Cafe & Billiard.
                </p>
            </div>

            {/* Testimonials Grid */}
            <section className="mt-10 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#222727] pb-4 mb-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00]">
                            Reviews
                        </p>
                        <h2 className="mt-1 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Apa Kata Pelanggan?
                        </h2>
                    </div>
                    <div className="rounded-[10px] border border-[#222727] px-4 py-2 text-xs font-bold text-[#c7d0d8] tracking-wide">
                        {(testimonials || []).length} Ulasan
                    </div>
                </div>

                {(testimonials || []).length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {(testimonials || []).map((t) => (
                            <article
                                key={t.id}
                                className="rounded-[18px] border border-[#222727] bg-[#151919]/80 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/25 hover:shadow-lg group"
                            >
                                <div>
                                    {/* Quote Icon */}
                                    <svg className="w-6 h-6 text-[#ffcc00]/15 mb-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4.017v10H0z" />
                                    </svg>

                                    {/* Header: Name + Status */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h4 className="font-extrabold text-xs text-white">
                                                {t.name || t.user?.name}
                                            </h4>
                                            <p className="text-[10px] text-[#5b6e6e] mt-0.5">
                                                {t.user?.email || "Pelanggan QM"}
                                            </p>
                                        </div>
                                        {t.status && <StatusBadge value={t.status} />}
                                    </div>

                                    {/* Rating Stars */}
                                    <div className="mt-3 flex items-center gap-1 text-[11px]">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span
                                                key={i}
                                                className={
                                                    i < (t.rating || 0)
                                                        ? "text-[#ffcc00]"
                                                        : "text-[#222727]"
                                                }
                                            >
                                                ★
                                            </span>
                                        ))}
                                        <span className="ml-1.5 text-[10px] text-[#5b6e6e] font-bold">
                                            {t.rating || 0}/5
                                        </span>
                                    </div>

                                    {/* Message */}
                                    <p className="mt-3 text-xs leading-5 text-slate-300 italic">
                                        &ldquo;{t.message}&rdquo;
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[18px] border border-[#222727] bg-[#151919]/30 p-16 text-center">
                        <svg className="mx-auto h-10 w-10 text-[#5b6e6e] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                        <p className="text-xs text-[#5b6e6e] font-bold">
                            Belum ada testimoni yang tersedia.
                        </p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
