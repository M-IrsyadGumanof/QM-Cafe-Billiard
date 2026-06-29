import PublicLayout from "@/Layouts/PublicLayout";
import { Link, router } from "@inertiajs/react";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";
import { useState } from "react";

export default function Menu({ menus, categories, filters = {} }) {
    const [search, setSearch] = useState(filters.search || "");
    const [category, setCategory] = useState(filters.category || "");

    const applyFilters = (nextSearch = search, nextCategory = category) => {
        router.get(
            "/menu",
            {
                search: nextSearch || undefined,
                category: nextCategory || undefined,
            },
            {
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const handleSearch = (value) => {
        setSearch(value);
        applyFilters(value, category);
    };

    const handleCategory = (slug) => {
        const nextCategory = category === slug ? "" : slug;
        setCategory(nextCategory);
        applyFilters(search, nextCategory);
    };

    return (
        <PublicLayout>
            {/* Header */}
            <div className="border-b border-[#222727] pb-8">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Café & Restaurant
                </p>
                <h1 className="mt-3 text-3xl font-black text-white md:text-4xl font-serif">
                    Food & Drink Menu
                </h1>
                <p className="mt-2 text-sm text-[#9aa7b3] max-w-2xl">
                    Pilih aneka sajian lezat makanan ringan, makanan berat, dan kopi hangat untuk menemani Anda.
                </p>
            </div>

            {/* Filter Card */}
            <div className="mt-10 rounded-2xl border border-[#222727] bg-[#111515]/60 p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="menu-search"
                        className="text-xs font-extrabold uppercase tracking-wider text-[#9aa7b3] ml-1"
                    >
                        Cari Menu Kuliner
                    </label>
                    <div className="relative">
                        <input
                            id="menu-search"
                            type="search"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Ketik nama makanan atau minuman..."
                            className="modern-input w-full !pl-11 py-3 text-sm"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg className="h-5 w-5 text-[#5b6e6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Category Tags */}
                <div className="mt-6 border-t border-[#222727]/60 pt-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#5b6e6e] mb-4 ml-1">Kategori</p>
                    <div className="flex flex-wrap gap-2.5">
                        <button
                            type="button"
                            onClick={() => handleCategory("")}
                            className={`rounded-full border px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                                !category
                                    ? "border-[#ffcc00] bg-[#ffcc00] text-[#151919] shadow-md shadow-[#ffcc00]/10"
                                    : "border-[#222727] bg-[#151919]/80 text-[#9aa7b3] hover:border-[#ffcc00]/30 hover:text-white"
                            }`}
                        >
                            Semua
                        </button>
                        {(categories || []).map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => handleCategory(c.slug || c.name)}
                                className={`rounded-full border px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                                    category === (c.slug || c.name)
                                        ? "border-[#ffcc00] bg-[#ffcc00] text-[#151919] shadow-md shadow-[#ffcc00]/10"
                                        : "border-[#222727] bg-[#151919]/80 text-[#9aa7b3] hover:border-[#ffcc00]/30 hover:text-white"
                                }`}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter Count & Reset */}
            <div className="mt-10 mb-6 flex items-center justify-between gap-3 text-sm text-[#9aa7b3]">
                <p className="font-medium">Menampilkan <span className="text-white font-bold">{(menus || []).length}</span> menu pilihan</p>
                {(search || category) && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setCategory("");
                            router.get(
                                "/menu",
                                {},
                                { preserveScroll: true, replace: true },
                            );
                        }}
                        className="rounded-xl border border-[#222727] bg-[#151919] px-4 py-2 text-sm font-bold text-slate-300 hover:border-red-500/25 hover:text-red-400 transition-colors duration-200"
                    >
                        Reset Filter
                    </button>
                )}
            </div>

            {/* Menus Grid */}
            {(menus || []).length === 0 ? (
                <div className="rounded-2xl border border-[#222727] bg-[#111515]/30 p-20 text-center text-sm text-[#5b6e6e]">
                    <svg className="mx-auto mb-4 h-12 w-12 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Tidak ada menu yang sesuai dengan pencarian Anda.
                </div>
            ) : (
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {(menus || []).map((menu) => (
                        <article
                            key={menu.id}
                            className="group flex flex-col rounded-2xl border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#111515] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ffcc00]/25 hover:shadow-xl hover:shadow-[#ffcc00]/5"
                        >
                            {/* Visual Image Block */}
                            <div className="mb-5 h-48 rounded-xl bg-gradient-to-br from-[#ffcc00]/10 to-[#151919] border border-[#ffcc00]/5 flex items-center justify-center relative shadow-inner overflow-hidden transition-all duration-300 group-hover:from-[#ffcc00]/15">
                                {menu.image ? (
                                    <img
                                        src={`/storage/${menu.image}`}
                                        alt={menu.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <svg className="w-14 h-14 text-[#ffcc00]/20 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                )}
                            </div>

                            {/* Card body — flex-1 so it stretches to fill available space */}
                            <div className="flex flex-col flex-1">
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="font-extrabold text-base text-white tracking-wide leading-snug line-clamp-2">
                                        {menu.name}
                                    </h3>
                                    <StatusBadge value={menu.status} />
                                </div>

                                <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-[#5b6e6e]">
                                    {menu.category?.name}
                                </p>

                                <p className="mt-4 text-xl font-black text-[#ffcc00]">
                                    {money(menu.price)}
                                </p>

                                {/* Description grows to fill remaining space, clamped to 2 lines */}
                                <p className="mt-3 flex-1 line-clamp-2 text-sm leading-relaxed text-[#9aa7b3]">
                                    {menu.description || ""}
                                </p>

                                <div className="mt-5 pt-5 border-t border-[#222727]">
                                    <Link
                                        href={`/menu/${menu.slug}`}
                                        className="flex w-full items-center justify-center rounded-xl bg-[#ffcc00]/10 border border-[#ffcc00]/25 hover:bg-[#ffcc00] hover:text-[#151919] text-[#ffcc00] py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.97] text-center"
                                    >
                                        Detail Menu
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </PublicLayout>
    );
}
