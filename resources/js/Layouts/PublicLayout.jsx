import { Link, usePage } from "@inertiajs/react";
import Flash from "@/Components/Shared/Flash";
import { useState, useEffect } from "react";

const nav = [
    ["Home", "/"],
    ["Menu", "/menu"],
    ["Billiard", "/billiard-packages"],
    ["Tables", "/table-availability"],
    ["Gallery", "/gallery"],
    ["Testimonials", "/testimonials"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
];

export default function PublicLayout({ children }) {
    const { auth } = usePage().props;
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [path]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const dashboardHref = auth?.user
        ? auth.user.role === "admin"
            ? "/dashboard"
            : auth.user.role === "customer"
              ? "/customer/dashboard"
              : auth.user.role === "kitchen_staff"
                ? "/kitchen/dashboard"
                : auth.user.role === "billiard_staff"
                  ? "/billiard/dashboard"
                  : "/owner/dashboard"
        : null;

    return (
        <div className="flex min-h-screen flex-col bg-transparent text-white">
            {/* Floating Glass Navbar */}
            <header className="sticky top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-7xl rounded-2xl border border-[#222727]/80 bg-[#111515]/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
                <div className="flex items-center justify-between px-5 py-3 lg:px-6 lg:py-3.5">
                    {/* Brand Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-lg font-black text-white hover:text-[#ffcc00] transition-colors duration-200 shrink-0"
                        style={{ fontFamily: "Playfair Display, serif" }}
                    >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ffcc00]/30 bg-gradient-to-tr from-[#ffcc00]/15 to-[#ffcc00]/5 text-sm font-sans font-black text-[#ffcc00]">
                            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" fill="#ffcc00" />
                                <circle cx="12" cy="12" r="4" fill="#ffffff" />
                                <text
                                    x="12"
                                    y="14.2"
                                    fontSize="6.5"
                                    fontWeight="900"
                                    fontFamily="system-ui, sans-serif"
                                    textAnchor="middle"
                                    fill="#111515"
                                >
                                    8
                                </text>
                            </svg>
                        </span>
                        <span className="hidden sm:inline tracking-wide">QM Cafe & Billiard</span>
                        <span className="sm:hidden tracking-wide text-[#ffcc00] text-base font-black">QM</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden items-center gap-1 xl:flex">
                        {nav.map(([label, href]) => {
                            const active = path === href || (href !== "/" && path.startsWith(href));
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`relative rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                                        active
                                            ? "text-[#ffcc00] bg-[#ffcc00]/10"
                                            : "text-[#9aa7b3] hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {label}
                                    {active && (
                                        <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[#ffcc00]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Auth + Hamburger */}
                    <div className="flex items-center gap-3">
                        {/* Auth Buttons (desktop) */}
                        <div className="hidden md:flex items-center gap-2.5 text-xs font-bold">
                            {auth?.user ? (
                                <>
                                    <Link
                                        href={dashboardHref}
                                        className="rounded-xl border border-[#222727] bg-[#181d1d] px-4 py-2.5 text-[#c7d0d8] hover:border-[#ffcc00]/30 hover:text-white transition-all duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        method="post"
                                        href="/logout"
                                        as="button"
                                        className="rounded-xl bg-[#ffcc00] px-4 py-2.5 text-[#151919] font-extrabold hover:bg-[#ffe066] active:scale-95 transition-all duration-200 shadow-md shadow-[#ffcc00]/10"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="rounded-xl border border-[#222727] bg-[#181d1d] px-4 py-2.5 text-[#c7d0d8] hover:border-[#ffcc00]/30 hover:text-white transition-all duration-200"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-xl bg-[#ffcc00] px-4 py-2.5 text-[#151919] font-extrabold hover:bg-[#ffe066] active:scale-95 transition-all duration-200 shadow-md shadow-[#ffcc00]/10"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Hamburger Button */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="xl:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-[#222727] bg-[#181d1d] text-[#9aa7b3] hover:text-white hover:border-[#ffcc00]/30 transition-all duration-200"
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="border-t border-[#222727]/60 px-5 py-4">
                        <nav className="grid gap-1">
                            {nav.map(([label, href]) => {
                                const active = path === href || (href !== "/" && path.startsWith(href));
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                                            active
                                                ? "text-[#ffcc00] bg-[#ffcc00]/10"
                                                : "text-[#9aa7b3] hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile Auth Buttons */}
                        <div className="mt-4 pt-4 border-t border-[#222727]/60 flex gap-3 md:hidden">
                            {auth?.user ? (
                                <>
                                    <Link
                                        href={dashboardHref}
                                        className="flex-1 text-center rounded-xl border border-[#222727] bg-[#181d1d] px-4 py-3 text-sm font-bold text-[#c7d0d8] hover:border-[#ffcc00]/30 hover:text-white transition-all duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        method="post"
                                        href="/logout"
                                        as="button"
                                        className="flex-1 text-center rounded-xl bg-[#ffcc00] px-4 py-3 text-sm font-extrabold text-[#151919] hover:bg-[#ffe066] transition-all duration-200"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="flex-1 text-center rounded-xl border border-[#222727] bg-[#181d1d] px-4 py-3 text-sm font-bold text-[#c7d0d8] hover:border-[#ffcc00]/30 hover:text-white transition-all duration-200"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="flex-1 text-center rounded-xl bg-[#ffcc00] px-4 py-3 text-sm font-extrabold text-[#151919] hover:bg-[#ffe066] transition-all duration-200"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm xl:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
                <Flash />
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-[#222727] bg-[#111515] mt-12">
                <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-4 lg:px-6 lg:py-12">
                    <div>
                        <p
                            className="text-lg font-black text-white font-serif"
                        >
                            QM <span className="text-[#ffcc00]">Cafe & Billiard</span><span className="text-[#ffcc00]">.</span>
                        </p>
                        <p className="mt-3 text-xs leading-5 text-[#9aa7b3] max-w-xs">
                            Cafe dan billiard modern untuk makan, nongkrong, dan
                            bermain dengan sistem reservasi online yang nyaman.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-[#ffcc00]">Quick Links</p>
                        <div className="mt-3.5 grid gap-2 text-xs text-[#9aa7b3]">
                            {nav.slice(0, 4).map(([label, href]) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="transition-colors hover:text-[#ffcc00]"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-[#ffcc00]">
                            Opening Hours
                        </p>
                        <p className="mt-3.5 text-xs leading-5 text-[#9aa7b3]">
                            Setiap hari
                            <br />
                            <span className="text-white font-extrabold font-mono">10.00 - 23.00 WIB</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-[#ffcc00]">Contact</p>
                        <p className="mt-3.5 text-xs leading-5 text-[#9aa7b3]">
                            Jl. Lintas Sumatera No.km3, Sungai Kambut,
                            <br />
                            Kec. Pulau Punjung, Kab. Dharmasraya,
                            <br />
                            Sumatera Barat 27614
                            <br />
                            WhatsApp: <span className="text-white font-extrabold font-mono">0895-2443-4144</span>
                        </p>
                    </div>
                </div>
                <div className="border-t border-[#222727] py-6 text-center text-[10px] text-[#5b6e6e] font-mono">
                    &copy; {new Date().getFullYear()} QM Cafe & Billiard. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

