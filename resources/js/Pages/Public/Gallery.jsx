import PublicLayout from "@/Layouts/PublicLayout";
import { useState, useEffect } from "react";

export default function Gallery({ galleries }) {
    const [activePhoto, setActivePhoto] = useState(null);
    const photoList = galleries || [];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activePhoto === null) return;
            if (e.key === "Escape") setActivePhoto(null);
            if (e.key === "ArrowRight") setActivePhoto((prev) => (prev + 1) % photoList.length);
            if (e.key === "ArrowLeft") setActivePhoto((prev) => (prev - 1 + photoList.length) % photoList.length);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activePhoto, photoList]);

    return (
        <PublicLayout>
            {/* Page Header */}
            <div className="border-b border-[#222727] pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                    Galeri Foto
                </p>
                <h1 className="mt-2 text-2xl font-black text-white md:text-3xl font-serif">
                    Gallery
                </h1>
                <p className="mt-2 text-xs leading-5 text-[#9aa7b3] max-w-2xl">
                    Lihat suasana, kegiatan, dan momen seru yang terjadi di QM Cafe & Billiard.
                </p>
            </div>

            {/* Gallery Grid */}
            <section className="mt-10 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#222727] pb-4 mb-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00]">
                            Koleksi Foto
                        </p>
                        <h2 className="mt-1 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Suasana & Kegiatan QM
                        </h2>
                    </div>
                    <div className="rounded-[10px] border border-[#222727] px-4 py-2 text-xs font-bold text-[#c7d0d8] tracking-wide">
                        {photoList.length} Foto
                    </div>
                </div>

                {photoList.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {photoList.map((g, index) => (
                            <article
                                key={g.id}
                                className="overflow-hidden rounded-[18px] border border-[#222727] bg-[#151919] group shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/25 hover:shadow-lg cursor-pointer"
                                onClick={() => setActivePhoto(index)}
                            >
                                <div className="overflow-hidden h-52 w-full bg-[#111515] relative">
                                    <img
                                        src={
                                            g.image
                                                ? `/storage/${g.image}`
                                                : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=600&auto=format&fit=crop"
                                        }
                                        alt={g.title || "Gallery QM Cafe"}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1212]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffcc00] text-[#151919] transform scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-[#ffcc00]/20">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#ffcc00]">
                                        {g.title}
                                    </h4>
                                    <p className="mt-1.5 text-xs text-[#9aa7b3] leading-5 line-clamp-2">
                                        {g.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[18px] border border-[#222727] bg-[#151919]/30 p-16 text-center">
                        <svg className="mx-auto h-10 w-10 text-[#5b6e6e] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        <p className="text-xs text-[#5b6e6e] font-bold">
                            Tidak ada foto galeri untuk ditampilkan.
                        </p>
                    </div>
                )}
            </section>

            {/* Lightbox Modal */}
            {activePhoto !== null && photoList[activePhoto] && (
                <div 
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in"
                    onClick={() => setActivePhoto(null)}
                >
                    {/* Close Button */}
                    <button 
                        className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 border border-slate-700/50 text-white hover:bg-slate-800 hover:text-[#ffcc00] transition-colors focus:outline-none"
                        onClick={() => setActivePhoto(null)}
                        title="Close (Esc)"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation - Prev */}
                    <button 
                        className="absolute left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/60 border border-slate-700/50 text-white hover:bg-slate-800 hover:text-[#ffcc00] transition-colors focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            setActivePhoto((prev) => (prev - 1 + photoList.length) % photoList.length);
                        }}
                        title="Previous (Left Arrow)"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Navigation - Next */}
                    <button 
                        className="absolute right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/60 border border-slate-700/50 text-white hover:bg-slate-800 hover:text-[#ffcc00] transition-colors focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            setActivePhoto((prev) => (prev + 1) % photoList.length);
                        }}
                        title="Next (Right Arrow)"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Modal Content Container */}
                    <div 
                        className="relative max-w-4xl w-full flex flex-col items-center animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={
                                photoList[activePhoto].image
                                    ? `/storage/${photoList[activePhoto].image}`
                                    : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=600&auto=format&fit=crop"
                            }
                            alt={photoList[activePhoto].title || "Gallery Image"}
                            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-[#2b3232]/35"
                        />

                        {/* Title and Description */}
                        <div className="mt-4 text-center max-w-xl px-4">
                            <h3 className="text-lg font-black text-white font-serif tracking-wide">
                                {photoList[activePhoto].title}
                            </h3>
                            {photoList[activePhoto].description && (
                                <p className="mt-1.5 text-xs text-[#9aa7b3] leading-relaxed">
                                    {photoList[activePhoto].description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
