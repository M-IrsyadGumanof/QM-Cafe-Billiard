import PublicLayout from "@/Layouts/PublicLayout";
import { Link, usePage } from "@inertiajs/react";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";

export default function BilliardPackages({ packages }) {
    const { auth } = usePage().props;
    const isLoggedIn = !!auth?.user;
    return (
        <PublicLayout>
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Pricing Plans
                </p>
                <h1 className="mt-2 text-3xl font-black text-white md:text-4xl font-serif">
                    Billiard Packages
                </h1>
                <p className="mt-2 text-xs text-[#9aa7b3] max-w-2xl leading-5">
                    Pilih paket bermain regular atau personal terbaik yang sesuai dengan kebutuhan kumpul bersama teman atau latihan mandiri Anda.
                </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(packages || []).map((p) => {
                    const isPersonal = p.type === "personal";
                    return (
                        <div
                            key={p.id}
                            className={`group relative flex flex-col justify-between h-full rounded-[20px] border bg-gradient-to-br from-[#181d1d] to-[#111515] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                                isPersonal 
                                ? "border-emerald-500/25 hover:border-emerald-500/40 hover:shadow-emerald-500/5" 
                                : "border-[#ffcc00]/20 hover:border-[#ffcc00]/40 hover:shadow-[#ffcc00]/5"
                            }`}
                        >
                            <div>
                                {/* Decorative badge */}
                                <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${
                                    isPersonal 
                                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" 
                                    : "border-[#ffcc00]/30 bg-[#ffcc00]/10 text-[#ffcc00]"
                                }`}>
                                    {p.type}
                                </span>

                                <h3 className="mt-4 text-xl font-extrabold text-white tracking-wide">{p.name}</h3>
                                
                                <p className={`mt-4 text-3xl font-black ${isPersonal ? 'text-emerald-400' : 'text-[#ffcc00]'}`}>
                                    {isPersonal ? "Bayar Sesuai Jam" : money(p.price)}
                                </p>
                                
                                <p className="mt-4 text-xs leading-5 text-[#9aa7b3]">
                                    {p.description}
                                </p>
                            </div>
                            
                            <div className="mt-8 border-t border-[#222727] pt-5">
                                <Link
                                    href="/customer/reservations/create"
                                    className={`flex w-full items-center justify-center rounded-[10px] py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                                        isPersonal
                                        ? "bg-emerald-500 text-[#151919] hover:bg-emerald-400 shadow-lg shadow-emerald-500/10"
                                        : "bg-[#ffcc00] text-[#151919] hover:bg-[#ffe066] shadow-lg shadow-[#ffcc00]/10"
                                    }`}
                                >
                                    {isLoggedIn ? "Pesan Sekarang" : "Login & Pesan"}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </PublicLayout>
    );
}
