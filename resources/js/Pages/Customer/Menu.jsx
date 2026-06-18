import CustomerLayout from "@/Layouts/CustomerLayout";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Menu({ menus, categories }) {
    const [toast, setToast] = useState(null);

    const addToCart = (menu) => {
        const cart = JSON.parse(localStorage.getItem("qm_cart") || "[]");
        const i = cart.findIndex((x) => x.menu_id === menu.id);
        if (i >= 0) cart[i].quantity += 1;
        else
            cart.push({
                menu_id: menu.id,
                name: menu.name,
                price: menu.price,
                quantity: 1,
            });
        localStorage.setItem("qm_cart", JSON.stringify(cart));
        
        // Show premium toast alert
        setToast(`${menu.name} berhasil ditambahkan ke keranjang!`);
        setTimeout(() => setToast(null), 2500);
    };

    return (
        <CustomerLayout>
            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-5 right-5 z-50 rounded-[12px] border border-emerald-500/20 bg-[#151919] px-5 py-3 text-sm font-extrabold text-emerald-400 shadow-lg shadow-black/40 animate-bounce transition-all duration-300">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Pemesanan Kuliner
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Daftar Menu Café
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Pilih makanan dan minuman favorit Anda, lalu tambahkan ke keranjang belanja untuk diproses.
                </p>
            </div>

            {/* Grid */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(menus || []).map((menu) => (
                    <div
                        key={menu.id}
                        className="group relative flex flex-col justify-between rounded-[15px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-5 transition-all duration-300 hover:border-[#ffcc00]/20 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div>
                            {/* Visual Image Block */}
                            <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-[#ffcc00]/10 to-[#151919] border border-[#ffcc00]/5 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:from-[#ffcc00]/15 relative">
                                <svg className="w-12 h-12 text-[#ffcc00]/15 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>

                            <div className="flex justify-between gap-3 items-start">
                                <h3 className="font-extrabold text-base leading-snug text-white tracking-wide">{menu.name}</h3>
                                <StatusBadge value={menu.status} />
                            </div>

                            <p className="mt-1 text-xs font-bold text-[#5b6e6e] uppercase tracking-wider">
                                {menu.category?.name || "Lainnya"}
                            </p>
                            
                            <p className="mt-3 text-lg font-black text-[#ffcc00]">
                                {money(menu.price)}
                            </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-[#222727] flex gap-2.5">
                            <button
                                onClick={() => addToCart(menu)}
                                className="flex-1 rounded-[10px] bg-[#ffcc00] px-4 py-2.5 text-xs font-bold text-[#151919] hover:bg-[#e6b800] active:scale-[0.97] transition-all duration-200"
                            >
                                Tambah
                            </button>
                            <Link
                                href={`/customer/menu/${menu.slug}`}
                                className="rounded-[10px] border border-[#222727] bg-[#151919] px-4 py-2.5 text-xs font-bold text-[#9aa7b3] hover:border-[#ffcc00]/25 hover:text-white transition-all duration-200"
                            >
                                Detail
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </CustomerLayout>
    );
}
