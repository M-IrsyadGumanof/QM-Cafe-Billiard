import { Link, usePage } from "@inertiajs/react";
import Flash from "@/Components/Shared/Flash";
import { useState, useEffect, useRef } from "react";
import SessionExpiringNotification from "@/Components/Shared/SessionExpiringNotification";

const menuGroups = [
    {
        title: "Overview",
        items: [
            {
                label: "Dashboard",
                href: "/customer/dashboard",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-[#ffcc00]"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                    </svg>
                ),
            },
            {
                label: "Profile",
                href: "/customer/profile",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-blue-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                ),
            },
        ],
    },
    {
        title: "Billiard & Café",
        items: [
            {
                label: "Menu",
                href: "/customer/menu",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-amber-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                    </svg>
                ),
            },
            {
                label: "Cart",
                href: "/customer/cart",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-emerald-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                ),
            },
        ],
    },
    {
        title: "Transaksi",
        items: [
            {
                label: "Orders",
                href: "/customer/orders",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-purple-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                ),
            },
            {
                label: "Reservations",
                href: "/customer/reservations",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-rose-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                        />
                    </svg>
                ),
            },
            {
                label: "Payments",
                href: "/customer/payments",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-cyan-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                    </svg>
                ),
            },
        ],
    },
    {
        title: "Interaksi",
        items: [
            {
                label: "Testimonials",
                href: "/customer/testimonials",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-pink-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                ),
            },
            {
                label: "Notifications",
                href: "/customer/notifications",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-red-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                ),
            },
        ],
    },
];

export default function CustomerLayout({ children }) {
    const { auth } = usePage().props;
    const path = window.location.pathname;
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    // Restore sidebar scroll position on load and path change
    useEffect(() => {
        const savedScroll = sessionStorage.getItem("customer_sidebar_scroll");
        if (savedScroll && navRef.current) {
            navRef.current.scrollTop = parseInt(savedScroll, 10);
        }
    }, [path]);

    const handleScroll = (e) => {
        sessionStorage.setItem("customer_sidebar_scroll", e.currentTarget.scrollTop);
    };

    // Helper to determine if link is active
    const getActive = (h) => path === h || path.startsWith(h + "/");

    // Get active menu label
    let activeLabel = "Customer Portal";
    for (const group of menuGroups) {
        const activeItem = group.items.find((item) => getActive(item.href));
        if (activeItem) {
            activeLabel = activeItem.label;
            break;
        }
    }

    return (
        <div className="min-h-screen bg-[#0f1212] text-slate-100 antialiased">
            {/* Sidebar backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 border-r border-[#222727] bg-[#111515] p-5 flex flex-col justify-between z-30 transition-transform duration-300 lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full lg:flex"
                }`}
            >
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Header Brand */}
                    <div className="mb-6 px-2">
                        <Link
                            href="/customer/dashboard"
                            className="font-serif text-2xl font-black tracking-wide text-white block hover:text-[#ffcc00] transition-colors duration-200"
                        >
                            QM CUSTOMER<span className="text-[#ffcc00] font-sans">.</span>
                        </Link>
                        <p className="text-[10px] font-bold tracking-[0.25em] text-[#ffcc00]/70 uppercase mt-0.5">
                            Customer Portal
                        </p>
                    </div>

                    {/* Back to main site link */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-[10px] border border-[#222727] bg-[#151919] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#9aa7b3] hover:text-[#ffcc00] hover:border-[#ffcc00]/25 transition-all duration-300 mb-6 mx-1.5"
                    >
                        <svg className="w-4 h-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Site
                    </Link>

                    {/* Nav Items */}
                    <nav 
                        ref={navRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-5"
                    >
                        {menuGroups.map((group) => (
                            <div key={group.title}>
                                <h3 className="px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#4f5e5e] mb-2">
                                    {group.title}
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item) => {
                                        const active = getActive(item.href);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`group flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-xs font-bold transition-all duration-300 relative ${
                                                    active
                                                        ? "bg-[#ffcc00] text-[#151919] shadow-lg shadow-[#ffcc00]/10 font-extrabold"
                                                        : "text-[#9aa7b3] hover:bg-[#181d1d] hover:text-white"
                                                }`}
                                            >
                                                {/* Active Left Indicator Bar */}
                                                {active && (
                                                    <span className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r bg-[#151919]" />
                                                )}

                                                {/* Icon */}
                                                <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                                                    {item.icon(active)}
                                                </div>

                                                {/* Label */}
                                                <span className="truncate">{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Footer User Info */}
                <div className="border-t border-[#222727] pt-4 mt-4 shrink-0 space-y-3">
                    {/* User Card */}
                    <div className="flex items-center gap-3 bg-[#181d1d] p-3 rounded-[12px] border border-[#222727]">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#ffcc00] to-[#ffd633] text-[#151919] font-black text-sm uppercase overflow-hidden">
                            {auth.user?.avatar ? (
                                <img
                                    src={`/storage/${auth.user.avatar}`}
                                    alt={auth.user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                auth.user?.name ? auth.user.name[0] : "C"
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="truncate text-xs font-extrabold text-white leading-none mb-1">
                                {auth.user?.name || "Customer"}
                            </h4>
                            <p className="truncate text-[10px] text-[#9aa7b3] font-mono leading-none">
                                {auth.user?.email}
                            </p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center gap-2 rounded-[10px] border border-[#2b3232] bg-[#151919] px-4 py-2.5 text-xs font-bold text-[#c7d0d8] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-300 text-center"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout Portal
                    </Link>
                </div>
            </aside>

            {/* Main Area */}
            <main className="lg:ml-64 min-h-screen flex flex-col">
                {/* Top header */}
                <header className="border-b border-[#222727] bg-[#111515]/80 backdrop-blur-md sticky top-0 px-6 py-4 flex items-center justify-between z-20">
                    <div className="flex items-center gap-3">
                        {/* Hamburger Button for mobile */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-1 text-[#9aa7b3] hover:text-white lg:hidden focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#5b6e6e] uppercase tracking-wider">Customer</span>
                            <span className="text-xs text-[#3b4747] font-bold">/</span>
                            <h2 className="text-xs font-extrabold text-[#ffcc00] uppercase tracking-widest">
                                {activeLabel}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-[#9aa7b3] uppercase">Portal Status</p>
                            <div className="flex items-center gap-1.5 justify-end">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ffcc00] animate-pulse" />
                                <span className="text-[9px] font-bold text-[#ffcc00] font-mono uppercase tracking-wider">Active</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <section className="p-6 flex-1 flex flex-col relative z-10">
                    <Flash />
                    <SessionExpiringNotification />
                    {children}
                </section>
            </main>
        </div>
    );
}
