import PublicLayout from "@/Layouts/PublicLayout";
import { Link, usePage } from "@inertiajs/react";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";

export default function MenuDetail({ menu }) {
    const { auth } = usePage().props;
    const isLoggedIn = !!auth?.user;
    return (
        <PublicLayout>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-[#5b6e6e] mb-6">
                <Link
                    href="/menu"
                    className="hover:text-[#ffcc00] transition-colors duration-200"
                >
                    Menu
                </Link>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-[#9aa7b3] font-bold truncate">
                    {menu.name}
                </span>
            </nav>

            {/* Detail Section */}
            <section className="rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-[20px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#0f1212] h-80 lg:h-full min-h-[320px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,204,0,0.08),transparent_40%)]" />
                        {menu.image ? (
                            <img
                                src={`/storage/${menu.image}`}
                                alt={menu.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="relative z-10 text-center">
                                <svg className="mx-auto w-14 h-14 text-[#ffcc00]/15 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <p className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider">
                                    Foto Menu
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3">
                            <StatusBadge value={menu.status} />
                            {menu.category?.name && (
                                <span className="inline-flex rounded-full border border-[#222727] bg-[#151919] px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#9aa7b3]">
                                    {menu.category.name}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-4 text-3xl font-black text-white md:text-4xl font-serif">
                            {menu.name}
                        </h1>

                        <p className="mt-5 text-3xl font-black text-[#ffcc00]">
                            {money(menu.price)}
                        </p>

                        {menu.description && (
                            <div className="mt-6 border-t border-[#222727] pt-5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00] mb-2">
                                    Deskripsi
                                </p>
                                <p className="text-sm leading-6 text-[#c7d0d8]">
                                    {menu.description}
                                </p>
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/customer/menu"
                                className="rounded-[12px] bg-[#ffcc00] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#151919] hover:bg-[#ffe066] active:scale-95 transition-all duration-200 shadow-lg shadow-[#ffcc00]/10"
                            >
                                {isLoggedIn ? "Pesan Sekarang" : "Login untuk Memesan"}
                            </Link>
                            <Link
                                href="/menu"
                                className="rounded-[12px] border border-[#222727] bg-[#151919]/60 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[#ffcc00]/30 hover:text-[#ffcc00] active:scale-95 transition-all duration-200"
                            >
                                ← Kembali ke Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
