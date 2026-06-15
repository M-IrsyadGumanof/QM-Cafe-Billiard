import CustomerLayout from "@/Layouts/CustomerLayout";
import { money } from "@/Components/Shared/Format";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Cart() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem("qm_cart") || "[]"));
    }, []);

    const save = (next) => {
        setItems(next);
        localStorage.setItem("qm_cart", JSON.stringify(next));
    };

    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <CustomerLayout>
            {/* Header */}
            <div className="flex flex-col gap-2 border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Keranjang Belanja
                </p>
                <h1 className="text-2xl font-black text-white md:text-3xl font-serif">
                    Keranjang Kuliner Anda
                </h1>
                <p className="text-xs text-[#9aa7b3]">
                    Berikut daftar makanan dan minuman yang telah Anda pilih. Silakan sesuaikan jumlah atau lanjut ke pembayaran.
                </p>
            </div>

            {/* List */}
            <div className="mt-8 grid gap-4">
                {items.length === 0 && (
                    <div className="rounded-[15px] border border-[#222727] bg-[#111515] p-12 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-[#3b4747] mb-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <h3 className="text-sm font-bold text-white">Keranjang Kosong</h3>
                        <p className="mt-1 text-xs text-[#5b6e6e]">
                            Silakan kembali ke menu kuliner untuk memilih hidangan kesukaan Anda.
                        </p>
                        <Link
                            href="/customer/menu"
                            className="mt-4 inline-flex rounded-[10px] bg-[#ffcc00] px-4 py-2 text-xs font-bold text-[#151919] hover:bg-[#e6b800] transition-colors"
                        >
                            Lihat Menu Kuliner
                        </Link>
                    </div>
                )}

                {items.map((item, idx) => (
                    <div
                        key={item.menu_id}
                        className="group relative flex flex-wrap items-center justify-between gap-4 rounded-[15px] border border-[#222727] bg-gradient-to-r from-[#181d1d] to-[#111515] p-5 shadow-sm transition-all duration-300 hover:border-[#ffcc00]/20"
                    >
                        <div className="flex-1 min-w-[200px]">
                            <p className="font-extrabold text-white text-base tracking-wide">{item.name}</p>
                            <p className="text-xs text-[#9aa7b3] mt-1 font-mono">
                                {money(item.price)} x {item.quantity}
                            </p>
                        </div>

                        {/* Quantity Controls (Aligned Vertically) */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="w-8 h-8 rounded-[8px] border border-[#222727] bg-[#151919] flex items-center justify-center text-sm font-bold text-slate-300 hover:border-[#ffcc00] hover:text-[#ffcc00] transition-all duration-200 focus:outline-none"
                                onClick={() =>
                                    save(
                                        items.map((x, i) =>
                                            i === idx
                                                ? {
                                                      ...x,
                                                      quantity: Math.max(1, x.quantity - 1),
                                                  }
                                                : x
                                        )
                                    )
                                }
                            >
                                -
                            </button>
                            <span className="w-8 text-center text-sm font-extrabold text-white font-mono">
                                {item.quantity}
                            </span>
                            <button
                                type="button"
                                className="w-8 h-8 rounded-[8px] border border-[#222727] bg-[#151919] flex items-center justify-center text-sm font-bold text-slate-300 hover:border-[#ffcc00] hover:text-[#ffcc00] transition-all duration-200 focus:outline-none"
                                onClick={() =>
                                    save(
                                        items.map((x, i) =>
                                            i === idx
                                                ? {
                                                      ...x,
                                                      quantity: x.quantity + 1,
                                                  }
                                                : x
                                        )
                                    )
                                }
                            >
                                +
                            </button>
                            <button
                                type="button"
                                className="h-8 px-4 rounded-[8px] border border-red-500/20 bg-red-500/5 flex items-center justify-center text-xs font-bold text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 focus:outline-none"
                                onClick={() =>
                                    save(items.filter((_, i) => i !== idx))
                                }
                            >
                                Remove
                            </button>
                        </div>

                        <div className="text-right min-w-[120px]">
                            <span className="text-[10px] font-bold text-[#5b6e6e] uppercase tracking-wider block">
                                Subtotal
                            </span>
                            <span className="text-base font-black text-[#ffcc00] font-sans">
                                {money(item.price * item.quantity)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total summary card */}
            {items.length > 0 && (
                <div className="mt-8 rounded-[15px] border border-[#222727] bg-gradient-to-b from-[#151919] to-[#111515] p-6 shadow-md max-w-md ml-auto">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-[#9aa7b3]">Total Bayar:</span>
                        <span className="text-2xl font-black text-[#ffcc00] font-sans">
                            {money(total)}
                        </span>
                    </div>
                    <Link
                        href="/customer/checkout"
                        className="mt-6 w-full inline-flex items-center justify-center rounded-[10px] bg-[#ffcc00] px-5 py-3.5 text-sm font-extrabold text-[#151919] hover:bg-[#e6b800] transition-colors shadow-md shadow-[#ffcc00]/10"
                    >
                        Lanjut ke Checkout
                    </Link>
                </div>
            )}
        </CustomerLayout>
    );
}
