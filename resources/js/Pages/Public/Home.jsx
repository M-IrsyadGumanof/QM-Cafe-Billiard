import PublicLayout from "@/Layouts/PublicLayout";
import { Link } from "@inertiajs/react";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { money } from "@/Components/Shared/Format";
import { useState, useEffect } from "react";

export default function Home({
    stats,
    galleries = [],
    testimonials = [],
    packages = [],
    menus = [],
}) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            subtitle: "Cafe • Billiard • Reservation",
            title: <>Destinasi nongkrong & billiard lebih <span className="text-[#ffcc00]">premium.</span></>,
            description: "QM Cafe & Billiard menyatukan menu kuliner favorit, reservasi meja billiard yang mudah, dan sistem pembayaran transparan dalam satu tampilan modern.",
            btnPrimary: { label: "Lihat Menu", href: "/menu" },
            btnSecondary: { label: "Cek Meja", href: "/table-availability" },
            icon: (
                <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#1d2222] to-[#111515] border border-[#222727] flex items-center justify-center relative shadow-inner shadow-black/40">
                    <div className="absolute inset-4 rounded-full border border-dashed border-[#ffcc00]/10 animate-spin-slow" />
                    <div className="w-48 h-48 rounded-full bg-[#0f1212] border border-[#ffcc00]/25 flex flex-col items-center justify-center shadow-lg shadow-black/80">
                        <span className="font-serif text-6xl font-black text-[#ffcc00] leading-none mb-1">8</span>
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#9aa7b3]">QM Pool</span>
                    </div>
                </div>
            )
        },
        {
            subtitle: "Professional Billiard Arena",
            title: <>Meja Billiard Standar <span className="text-[#ffcc00]">Turnamen.</span></>,
            description: "Rasakan pengalaman bermain billiard kelas dunia dengan meja premium, bola presisi tinggi, stik lurus berkualitas, dan pencahayaan optimal di setiap meja billiard.",
            btnPrimary: { label: "Cek Ketersediaan Meja", href: "/table-availability" },
            btnSecondary: { label: "Billiard Packages", href: "/billiard-packages" },
            icon: (
                <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#182725] to-[#111515] border border-[#ffcc00]/10 flex items-center justify-center relative shadow-inner shadow-black/40">
                    <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/10" />
                    <div className="w-48 h-48 rounded-full bg-[#0f1212] border border-cyan-500/25 flex flex-col items-center justify-center shadow-lg shadow-black/80">
                        <svg className="w-16 h-16 text-[#ffcc00] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#9aa7b3]">Arena Pro</span>
                    </div>
                </div>
            )
        },
        {
            subtitle: "Delicious Coffee & Culinary",
            title: <>Sajian Menu Kuliner <span className="text-[#ffcc00]">Pilihan Terbaik.</span></>,
            description: "Dari kopi hangat racikan barista, mocktail segar, hingga hidangan berat yang lezat, kami siap memanjakan lidah Anda sepanjang waktu bermain billiard.",
            btnPrimary: { label: "Pesan Kuliner", href: "/menu" },
            btnSecondary: { label: "Hubungi Kami", href: "/contact" },
            icon: (
                <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#252218] to-[#111515] border border-[#ffcc00]/10 flex items-center justify-center relative shadow-inner shadow-black/40">
                    <div className="absolute inset-4 rounded-full border border-dashed border-[#ffcc00]/10" />
                    <div className="w-48 h-48 rounded-full bg-[#0f1212] border border-[#ffcc00]/25 flex flex-col items-center justify-center shadow-lg shadow-black/80">
                        <svg className="w-16 h-16 text-[#ffcc00] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#9aa7b3]">QM Cafe</span>
                    </div>
                </div>
            )
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const summary = [
        {
            label: "Meja Tersedia",
            value: stats?.tables ?? 6,
            note: "Siap dipesan online",
        },
        {
            label: "Menu Terfavorit",
            value: stats?.menus ?? 8,
            note: "Makanan & minuman",
        },
        {
            label: "Paket Billiard",
            value: stats?.packages ?? 4,
            note: "Regular & personal",
        },
    ];

    return (
        <PublicLayout>
            {/* Hero Section Carousel */}
            <section className="relative overflow-hidden rounded-[24px] border border-[#222727] bg-gradient-to-br from-[#181d1d] to-[#0f1212] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:p-10 lg:p-16 min-h-[420px] flex items-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,204,0,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02),transparent_20%)]" />
                
                {/* Arrow Controls */}
                <button 
                    onClick={prevSlide}
                    className="absolute left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#222727] bg-[#111515]/80 text-[#9aa7b3] hover:text-white hover:border-[#ffcc00]/30 transition-all active:scale-95"
                    aria-label="Previous Slide"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    onClick={nextSlide}
                    className="absolute right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#222727] bg-[#111515]/80 text-[#9aa7b3] hover:text-white hover:border-[#ffcc00]/30 transition-all active:scale-95"
                    aria-label="Next Slide"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Slides Container */}
                <div className="relative w-full z-10">
                    {slides.map((slide, idx) => (
                        <div 
                            key={idx} 
                            className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-700 ease-in-out ${
                                idx === currentSlide 
                                    ? "opacity-100 translate-x-0 relative pointer-events-auto" 
                                    : "opacity-0 absolute translate-x-8 inset-0 pointer-events-none"
                            }`}
                        >
                            <div className="flex-1 text-center lg:text-left space-y-6">
                                <p className="inline-flex items-center rounded-full border border-[#ffcc00]/20 bg-[#ffcc00]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00]">
                                    {slide.subtitle}
                                </p>
                                
                                <h1 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl font-serif">
                                    {slide.title}
                                </h1>
                                
                                <p className="max-w-xl text-sm leading-6 text-[#9aa7b3] md:text-base">
                                    {slide.description}
                                </p>
                                
                                <div className="flex flex-wrap justify-center lg:justify-start gap-3.5 pt-2">
                                    <Link
                                        href={slide.btnPrimary.href}
                                        className="rounded-[12px] bg-[#ffcc00] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#151919] hover:bg-[#ffe066] active:scale-95 transition-all duration-200 shadow-lg shadow-[#ffcc00]/10"
                                    >
                                        {slide.btnPrimary.label}
                                    </Link>
                                    <Link
                                        href={slide.btnSecondary.href}
                                        className="rounded-[12px] border border-[#222727] bg-[#151919]/60 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[#ffcc00]/30 hover:text-[#ffcc00] active:scale-95 transition-all duration-200"
                                    >
                                        {slide.btnSecondary.label}
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden lg:flex flex-1 justify-center items-center">
                                {slide.icon}
                            </div>
                        </div>
                    ))}

                    {/* Indicators */}
                    <div className="mt-8 flex justify-center lg:justify-start gap-2.5">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    idx === currentSlide ? "w-8 bg-[#ffcc00]" : "w-2 bg-[#2b3232] hover:bg-[#5b6e6e]"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="mt-12 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8 lg:p-10">
                <div className="flex flex-col gap-5 rounded-[18px] border border-[#222727] bg-[#151919]/90 p-5 md:flex-row md:items-end md:justify-between md:p-6">
                    <div className="max-w-xl">
                        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffcc00]">
                            Why Choose QM?
                        </p>
                        <h2 className="mt-2 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Kenapa Memilih QM Cafe & Billiard?
                        </h2>
                        <p className="mt-2 text-xs leading-5 text-[#9aa7b3]">
                            Kami menghadirkan ruang santai dan tempat bermain billiard terbaik di Padang dengan dukungan sistem modern yang ramah pengguna.
                        </p>
                    </div>
                    <div className="shrink-0 self-start md:self-end rounded-[12px] border border-[#222727] bg-[#111515] px-4 py-2.5 text-xs font-bold text-[#c7d0d8] tracking-wide">
                        Premium • Fast • Minimalist
                    </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        [
                            "01",
                            "Reservasi Meja Instan",
                            "Cek ketersediaan meja secara real-time, pilih durasi main, dan amankan slot meja billiard favorit Anda tanpa antre.",
                        ],
                        [
                            "02",
                            "Café & Kuliner Lezat",
                            "Nikmati beragam sajian menu kopi premium, minuman segar, dan makanan lezat sembari menemani waktu bermain billiard Anda.",
                        ],
                        [
                            "03",
                            "Sistem Transaksi Transparan",
                            "Pantau riwayat pembayaran, status pesanan dapur, dan kode reservasi billiard Anda melalui halaman dashboard personal.",
                        ],
                    ].map(([number, title, text]) => (
                        <article
                            key={title}
                            className="rounded-[18px] border border-[#222727] bg-[#151919]/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/25 hover:bg-[#181d1d]"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#ffcc00]/20 bg-[#ffcc00]/5 text-xs font-black text-[#ffcc00]">
                                    {number}
                                </span>
                                <span className="h-px flex-1 bg-gradient-to-r from-[#222727] to-transparent" />
                            </div>
                            <h3 className="mt-4 text-sm font-extrabold text-white tracking-wide">
                                {title}
                            </h3>
                            <p className="mt-2 text-xs leading-5 text-[#9aa7b3]">
                                {text}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Gallery Preview Section */}
            <section className="mt-12 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#222727] pb-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00]">
                            Gallery
                        </p>
                        <h2 className="mt-1 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Suasana & Kegiatan QM
                        </h2>
                    </div>
                    <Link
                        href="/gallery"
                        className="rounded-[10px] border border-[#222727] px-4 py-2 text-xs font-bold text-[#c7d0d8] hover:border-[#ffcc00]/35 hover:text-[#ffcc00] transition-colors duration-200"
                    >
                        Lihat Semua
                    </Link>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {galleries && galleries.length > 0 ? (
                        galleries.slice(0, 3).map((item) => (
                            <article
                                key={item.id}
                                className="overflow-hidden rounded-2xl border border-[#222727] bg-[#151919] group shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc00]/25 hover:shadow-xl hover:shadow-black/30"
                            >
                                <div className="overflow-hidden aspect-[4/3] w-full bg-[#111515]">
                                    <img
                                        src={
                                            item.image
                                                ? `/storage/${item.image}`
                                                : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=600&auto=format&fit=crop"
                                        }
                                        alt={item.title || "Gallery QM Cafe"}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#ffcc00]">
                                        {item.title}
                                    </h4>
                                    <p className="mt-2 text-sm text-[#9aa7b3] leading-5 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-3 py-10 text-center text-xs text-[#5b6e6e]">
                            Tidak ada foto galeri terbaru untuk ditampilkan.
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="mt-12 rounded-[24px] border border-[#222727] bg-[#111515]/60 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#222727] pb-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffcc00]">
                            Testimonials
                        </p>
                        <h2 className="mt-1 text-xl font-extrabold text-white md:text-2xl font-serif">
                            Apa Kata Pelanggan?
                        </h2>
                    </div>
                    <Link
                        href="/testimonials"
                        className="rounded-[10px] border border-[#222727] px-4 py-2 text-xs font-bold text-[#c7d0d8] hover:border-[#ffcc00]/35 hover:text-[#ffcc00] transition-colors duration-200"
                    >
                        Lihat Semua
                    </Link>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials && testimonials.length > 0 ? (
                        testimonials.slice(0, 3).map((item) => (
                            <article
                                key={item.id}
                                className="rounded-[18px] border border-[#222727] bg-[#151919]/80 p-5 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h4 className="font-extrabold text-xs text-white">
                                                {item.name || item.user?.name}
                                            </h4>
                                            <p className="text-[10px] text-[#5b6e6e] mt-0.5">
                                                {item.user?.email || "Pelanggan QM"}
                                            </p>
                                        </div>
                                        <StatusBadge value={item.status} />
                                    </div>
                                    <div className="mt-3 flex items-center gap-1 text-[11px] text-[#ffcc00]">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span
                                                key={i}
                                                className={
                                                    i < item.rating
                                                        ? "text-[#ffcc00]"
                                                        : "text-[#222727]"
                                                }
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <p className="mt-3 text-xs leading-5 text-slate-300 italic">
                                        “{item.message}”
                                    </p>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-3 py-10 text-center text-xs text-[#5b6e6e]">
                            Belum ada testimoni terbaru.
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
