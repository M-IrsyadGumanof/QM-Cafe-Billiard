import PublicLayout from "@/Layouts/PublicLayout";
import { Link, usePage } from "@inertiajs/react";
import StatusBadge from "@/Components/Shared/StatusBadge";

export default function TableAvailability({ tables }) {
    const { auth } = usePage().props;
    const isLoggedIn = !!auth?.user;
    return (
        <PublicLayout>
            {/* Page Header */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Reservasi Meja
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Table Availability
                </h1>
                <p className="mt-2 text-xs leading-5 text-[#9aa7b3] max-w-2xl">
                    Cek status ketersediaan meja billiard secara real-time sebelum melakukan reservasi.
                </p>
            </div>

            {/* Status Legend */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-[#9aa7b3] uppercase tracking-wider">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="text-[10px] font-bold text-[#9aa7b3] uppercase tracking-wider">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-bold text-[#9aa7b3] uppercase tracking-wider">Reserved</span>
                </div>
            </div>

            {/* Tables Grid */}
            <section className="mt-8 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#222727] pb-4 mb-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00]">
                            Daftar Meja
                        </p>
                        <h2 className="mt-1 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Pilih Meja Billiard
                        </h2>
                    </div>
                    <div className="rounded-[10px] border border-[#222727] px-4 py-2 text-xs font-bold text-[#c7d0d8] tracking-wide">
                        {(tables || []).length} Meja
                    </div>
                </div>

                {(tables || []).length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {(tables || []).map((t) => {
                            const isAvailable = t.status === "available" || t.status === "tersedia";
                            return (
                                <article
                                    key={t.id}
                                    className={`rounded-[18px] border bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group ${
                                        isAvailable
                                            ? "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/5"
                                            : "border-[#222727] hover:border-[#ffcc00]/25"
                                    }`}
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            {/* Table Icon */}
                                            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
                                                isAvailable
                                                    ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                                                    : "border-[#ffcc00]/20 bg-[#ffcc00]/5 text-[#ffcc00]"
                                            }`}>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
                                                </svg>
                                            </span>
                                            <div>
                                                <h3 className="text-base font-extrabold text-white">
                                                    {t.name}
                                                </h3>
                                                {t.table_number && (
                                                    <p className="text-[10px] text-[#5b6e6e] font-bold mt-0.5">
                                                        {t.table_number}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <StatusBadge value={t.status} />
                                    </div>

                                    {/* Description */}
                                    {t.description && (
                                        <p className="mt-4 text-xs leading-5 text-[#9aa7b3]">
                                            {t.description}
                                        </p>
                                    )}

                                    {/* CTA */}
                                    {isAvailable && (
                                        <div className="mt-5 pt-4 border-t border-[#222727]">
                                            <Link
                                                href="/customer/reservations/create"
                                                className="flex w-full items-center justify-center rounded-[10px] py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.97] bg-emerald-500 text-[#151919] hover:bg-emerald-400 shadow-lg shadow-emerald-500/10"
                                            >
                                                {isLoggedIn ? "Reserve Now" : "Login to Book"}
                                            </Link>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-[18px] border border-[#222727] bg-[#151919]/30 p-16 text-center">
                        <svg className="mx-auto h-10 w-10 text-[#5b6e6e] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
                        </svg>
                        <p className="text-xs text-[#5b6e6e] font-bold">
                            Tidak ada data meja yang tersedia saat ini.
                        </p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
