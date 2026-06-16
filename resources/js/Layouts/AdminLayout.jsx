import { Link, usePage } from "@inertiajs/react";
import Flash from "@/Components/Shared/Flash";

const menuGroups = [
    {
        title: "Overview",
        items: [
            {
                label: "Dashboard",
                href: "/dashboard",
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
                label: "Reports",
                href: "/admin/reports",
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
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
                label: "Billiard Tables",
                href: "/admin/billiard-tables",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-sky-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                ),
            },
            {
                label: "Table Schedule",
                href: "/admin/table-schedule",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-indigo-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                ),
            },
            {
                label: "Menu",
                href: "/admin/menu",
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
                label: "Categories",
                href: "/admin/menu-categories",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-teal-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
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
                label: "Bookings",
                href: "/admin/bookings",
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
                label: "Orders",
                href: "/admin/orders",
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
                label: "Payments",
                href: "/admin/payments",
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
        title: "Lain-Lain",
        items: [
            {
                label: "Users",
                href: "/admin/users",
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
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                ),
            },
            {
                label: "FAQ",
                href: "/admin/faq",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-orange-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                ),
            },
            {
                label: "Testimonials",
                href: "/admin/testimonials",
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
                label: "Gallery",
                href: "/admin/gallery",
                icon: (active) => (
                    <svg
                        className={`h-5 w-5 transition-colors duration-200 ${active ? "text-[#151919]" : "text-violet-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                ),
            },
            {
                label: "Notifications",
                href: "/admin/notifications",
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

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const path = window.location.pathname;

    // Helper to determine if link is active
    const getActive = (h) => path === h || path.startsWith(h + "/");

    // Get active menu label
    let activeLabel = "Admin Panel";
    for (const group of menuGroups) {
        const activeItem = group.items.find((item) => getActive(item.href));
        if (activeItem) {
            activeLabel = activeItem.label;
            break;
        }
    }

    return (
        <div className="min-h-screen bg-[#0f1212] text-slate-100 antialiased">
            {/* Sidebar for Desktop */}
            <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-[#222727] bg-[#111515] p-5 lg:flex lg:flex-col justify-between z-30">
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Header Brand */}
                    <div className="mb-6 px-2">
                        <Link
                            href="/dashboard"
                            className="font-serif text-2xl font-black tracking-wide text-white block hover:text-[#ffcc00] transition-colors duration-200"
                        >
                            QM BILLIARD<span className="text-[#ffcc00] font-sans">.</span>
                        </Link>
                        <p className="text-[10px] font-bold tracking-[0.25em] text-[#ffcc00]/70 uppercase mt-0.5">
                            Admin Dashboard
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
                    <nav className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-5">
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
                                auth.user?.name ? auth.user.name[0] : 'A'
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="truncate text-xs font-extrabold text-white leading-none mb-1">
                                {auth.user?.name || 'Administrator'}
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
                        Logout Panel
                    </Link>
                </div>
            </aside>

            {/* Main Area */}
            <main className="lg:ml-64 min-h-screen flex flex-col">
                {/* Top header */}
                <header className="border-b border-[#222727] bg-[#111515]/80 backdrop-blur-md sticky top-0 px-6 py-4 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#5b6e6e] uppercase tracking-wider">Admin</span>
                        <span className="text-xs text-[#3b4747] font-bold">/</span>
                        <h2 className="text-xs font-extrabold text-[#ffcc00] uppercase tracking-widest">
                            {activeLabel}
                        </h2>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <p className="text-[10px] font-bold text-[#9aa7b3] uppercase">Panel Status</p>
                            <div className="flex items-center gap-1.5 justify-end">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-bold text-emerald-400 font-mono uppercase tracking-wider">Online</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <section className="p-6 flex-1 flex flex-col relative z-10">
                    <Flash />
                    {children}
                </section>
            </main>
        </div>
    );
}
