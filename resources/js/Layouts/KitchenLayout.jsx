import { Link, usePage } from "@inertiajs/react";
import Flash from "@/Components/Shared/Flash";

const menuItems = [
    {
        label: "Dashboard",
        href: "/kitchen/dashboard",
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
        label: "Incoming Orders",
        href: "/kitchen/orders",
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
];

export default function KitchenLayout({ children }) {
    const { auth } = usePage().props;
    const path = window.location.pathname;

    const getActive = (h) => path === h || path.startsWith(h + "/");

    let activeLabel = "Kitchen Panel";
    const activeItem = menuItems.find((item) => getActive(item.href));
    if (activeItem) {
        activeLabel = activeItem.label;
    }

    return (
        <div className="min-h-screen bg-[#0f1212] text-slate-100 antialiased">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-[#222727] bg-[#111515] p-5 lg:flex lg:flex-col justify-between z-30">
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Header Brand */}
                    <div className="mb-6 px-2">
                        <Link
                            href="/kitchen/dashboard"
                            className="font-serif text-2xl font-black tracking-wide text-white block hover:text-[#ffcc00] transition-colors duration-200"
                        >
                            QM KITCHEN<span className="text-[#ffcc00] font-sans">.</span>
                        </Link>
                        <p className="text-[10px] font-bold tracking-[0.25em] text-[#ffcc00]/70 uppercase mt-0.5">
                            Kitchen Staff Panel
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
                    <nav className="flex-1 space-y-1 overflow-y-auto pr-1 custom-scrollbar">
                        <h3 className="px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#4f5e5e] mb-2">
                            Menu Dapur
                        </h3>
                        {menuItems.map((item) => {
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
                                    {active && (
                                        <span className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r bg-[#151919]" />
                                    )}
                                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                                        {item.icon(active)}
                                    </div>
                                    <span className="truncate">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer User Info */}
                <div className="border-t border-[#222727] pt-4 mt-4 shrink-0 space-y-3">
                    <div className="flex items-center gap-3 bg-[#181d1d] p-3 rounded-[12px] border border-[#222727]">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#ffcc00] to-[#ffd633] text-[#151919] font-black text-sm uppercase overflow-hidden">
                            {auth.user?.avatar ? (
                                <img
                                    src={`/storage/${auth.user.avatar}`}
                                    alt={auth.user.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                auth.user?.name ? auth.user.name[0] : 'K'
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="truncate text-xs font-extrabold text-white leading-none mb-1">
                                {auth.user?.name || 'Kitchen Staff'}
                            </h4>
                            <p className="truncate text-[10px] text-[#9aa7b3] font-mono leading-none">
                                {auth.user?.email}
                            </p>
                        </div>
                    </div>

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
                        <span className="text-xs font-bold text-[#5b6e6e] uppercase tracking-wider">Kitchen</span>
                        <span className="text-xs text-[#3b4747] font-bold">/</span>
                        <h2 className="text-xs font-extrabold text-[#ffcc00] uppercase tracking-widest">
                            {activeLabel}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <p className="text-[10px] font-bold text-[#9aa7b3] uppercase">Status Dapur</p>
                            <div className="flex items-center gap-1.5 justify-end">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-bold text-emerald-400 font-mono uppercase tracking-wider">Active</span>
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
