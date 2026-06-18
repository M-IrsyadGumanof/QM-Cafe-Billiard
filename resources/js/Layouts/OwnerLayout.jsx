import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import Flash from "@/Components/Shared/Flash";

export default function OwnerLayout({ children }) {
    const { auth } = usePage().props;
    const path = window.location.pathname;

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const profileDropdownRef = useRef(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getActive = (h) => path === h || path.startsWith(h + "/");

    const links = [
        { label: "Dashboard", href: "/owner/dashboard" },
        { label: "Laporan", href: "/owner/reports" },
    ];

    return (
        <div className="min-h-screen bg-[#0f1212] text-slate-100 antialiased font-sans">
            {/* Ambient background glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#ffcc00]/5 blur-[120px]" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-emerald-500/3 blur-[120px]" />
            </div>

            {/* Sticky Floating Navbar */}
            <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 bg-gradient-to-b from-[#0f1212] via-[#0f1212]/95 to-transparent">
                <header className="mx-auto max-w-7xl bg-[#111515]/75 backdrop-blur-xl border border-[#2b3232]/60 px-5 py-3 rounded-2xl shadow-xl flex items-center justify-between transition-all duration-300">
                    {/* Brand Logo */}
                    <Link href="/owner/dashboard" className="group flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#ffcc00] to-[#e6b800] text-[#111515] shadow-lg shadow-[#ffcc00]/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#ffcc00]/25">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="8" />
                                <circle cx="12" cy="12" r="3" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-lg font-black tracking-wide text-white leading-none">
                                QM BILLIARD
                            </span>
                            <span className="text-[9px] font-bold tracking-[0.25em] text-[#ffcc00] uppercase mt-0.5 leading-none">
                                Owner Portal
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((link) => {
                            const active = getActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative py-1 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                                        active ? "text-[#ffcc00]" : "text-[#9aa7b3] hover:text-white"
                                    }`}
                                >
                                    {link.label}
                                    {active && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ffcc00]/50 via-[#ffcc00] to-[#ffcc00]/50 rounded-full shadow-[0_1px_6px_rgba(255,204,0,0.6)]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Actions & Mobile Hamburger */}
                    <div className="flex items-center gap-4">
                        {/* Desktop User Info & Dropdown */}
                        <div className="relative hidden md:block" ref={profileDropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2.5 focus:outline-none group rounded-xl p-1.5 hover:bg-[#181d1d] border border-transparent hover:border-[#222727] transition-all duration-200"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#ffcc00] to-[#ffd633] p-[1.5px] shadow-sm transition-transform duration-300 group-hover:scale-105">
                                    <div className="h-full w-full rounded-full bg-[#111515] flex items-center justify-center text-[#ffcc00] font-black text-xs uppercase overflow-hidden">
                                        {auth.user?.avatar ? (
                                            <img
                                                src={`/storage/${auth.user.avatar}`}
                                                alt={auth.user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            auth.user?.name ? auth.user.name[0] : 'O'
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col text-left max-w-[120px]">
                                    <span className="text-xs font-bold text-white truncate leading-none">
                                        {auth.user?.name || "Owner"}
                                    </span>
                                    <span className="text-[9px] text-[#9aa7b3] font-medium leading-none mt-1">
                                        Owner
                                    </span>
                                </div>
                                <svg
                                    className={`w-3 h-3 text-[#9aa7b3] transition-transform duration-300 ${
                                        isProfileOpen ? "rotate-180 text-white" : ""
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Card */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2.5 w-64 rounded-xl border border-[#2b3232] bg-[#111515] p-3 shadow-2xl z-50 animate-fade-in">
                                    {/* User Details Header */}
                                    <div className="px-3 py-2 border-b border-[#222727] mb-2 text-left">
                                        <p className="text-xs font-extrabold text-white truncate">
                                            {auth.user?.name || "Owner"}
                                        </p>
                                        <p className="text-[10px] text-[#9aa7b3] font-mono truncate mt-0.5">
                                            {auth.user?.email}
                                        </p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="space-y-1">
                                        <Link
                                            href="/"
                                            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#9aa7b3] hover:text-[#ffcc00] hover:bg-[#181d1d] rounded-lg transition-colors"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Lihat Website
                                        </Link>
                                        <Link
                                            href="/owner/dashboard"
                                            className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                                                getActive("/owner/dashboard")
                                                    ? "bg-[#ffcc00]/5 text-[#ffcc00]"
                                                    : "text-[#9aa7b3] hover:text-[#ffcc00] hover:bg-[#181d1d]"
                                            }`}
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/owner/reports"
                                            className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                                                getActive("/owner/reports")
                                                    ? "bg-[#ffcc00]/5 text-[#ffcc00]"
                                                    : "text-[#9aa7b3] hover:text-[#ffcc00] hover:bg-[#181d1d]"
                                            }`}
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            Laporan Bisnis
                                        </Link>
                                        
                                        <div className="border-t border-[#222727] my-2" />
                                        
                                        <Link
                                            method="post"
                                            href="/logout"
                                            as="button"
                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Keluar Sesi
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Hamburguer Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex md:hidden items-center justify-center p-2 rounded-xl bg-[#181d1d] border border-[#2b3232]/80 text-[#9aa7b3] hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Mobile Drawer/Menu overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-2 mx-auto max-w-7xl bg-[#111515] border border-[#2b3232] rounded-2xl p-4 shadow-2xl animate-slide-down">
                        <div className="flex flex-col gap-3">
                            {links.map((link) => {
                                const active = getActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                                            active
                                                ? "bg-[#ffcc00]/10 text-[#ffcc00] border-l-4 border-[#ffcc00]"
                                                : "text-[#9aa7b3] hover:text-white hover:bg-[#181d1d]"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <div className="border-t border-[#222727] my-1" />
                            
                            {/* User details on mobile */}
                            <div className="flex items-center gap-3 px-4 py-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#ffcc00] to-[#ffd633] text-[#111515] font-black text-sm uppercase overflow-hidden">
                                    {auth.user?.avatar ? (
                                        <img
                                            src={`/storage/${auth.user.avatar}`}
                                            alt={auth.user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        auth.user?.name ? auth.user.name[0] : 'O'
                                    )}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-bold text-white truncate max-w-[180px]">
                                        {auth.user?.name || "Owner"}
                                    </span>
                                    <span className="text-[10px] text-[#9aa7b3] font-mono truncate max-w-[180px]">
                                        {auth.user?.email}
                                    </span>
                                </div>
                            </div>
                            
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-[#9aa7b3] hover:text-[#ffcc00] hover:bg-[#181d1d] rounded-xl transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Lihat Website
                            </Link>

                            <Link
                                method="post"
                                href="/logout"
                                as="button"
                                className="w-full flex items-center gap-2 px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Keluar Sesi
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Area */}
            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <Flash />
                {children}
            </main>
        </div>
    );
}
