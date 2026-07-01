import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, maxWidth = "max-w-md" }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#111515] text-white">
            {/* Left side: Premium Branding & Image (hidden on mobile) */}
            <div className="relative hidden md:flex md:w-1/2 h-screen sticky top-0 flex-col justify-between overflow-hidden bg-cover bg-center p-12 border-r border-[#2b3232]/30"
                 style={{ backgroundImage: "url('/images/auth_side_bg.png')" }}>
                
                {/* Dark overlay with glassmorphism glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0d] via-[#111515]/85 to-[#111515]/75 z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ffcc00]/5 via-transparent to-transparent z-0" />

                {/* Top: Logo */}
                <div className="relative z-10">
                    <Link href="/" className="font-serif text-3xl font-black tracking-tight text-[#ffcc00] hover:text-[#ffe17a] transition-colors duration-200">
                        QM Cafe & Billiard
                    </Link>
                    <p className="mt-2.5 text-xs font-medium uppercase tracking-[0.25em] text-[#9aa7b3]">
                        Exclusive Booking & Dining Portal
                    </p>
                </div>

                {/* Center: Slogan and details */}
                <div className="relative z-10 my-auto max-w-md space-y-6">
                    <h2 className="text-4xl font-black font-serif leading-tight text-white">
                        Your Perfect Break <br /> Starts Here.
                    </h2>
                    <p className="text-sm text-[#9aa7b3] leading-relaxed">
                        Experience the premium billiard hall booking combined with our cozy cafe ordering. Reserve tables, manage playing sessions, and order delicacies seamlessly in one dark premium platform.
                    </p>
                    
                    {/* Features list */}
                    <div className="space-y-4 pt-4 border-t border-[#2b3232]/60">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#ffcc00]">
                                🎱
                            </div>
                            <span className="text-xs font-bold text-slate-200">Premium Billiard Table Reservation</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#ffcc00]">
                                🍔
                            </div>
                            <span className="text-xs font-bold text-slate-200">Delicious Food & Drink Direct Ordering</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#ffcc00]">
                                ⏱️
                            </div>
                            <span className="text-xs font-bold text-slate-200">Real-time Session Monitoring & Alert Notifications</span>
                        </div>
                    </div>
                </div>

                {/* Bottom: Footer Info */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-[#5b6e6e] font-semibold border-t border-[#2b3232]/40 pt-4">
                    <span>© {new Date().getFullYear()} QM Cafe & Billiard. All rights reserved.</span>
                    <div className="flex gap-4">
                        <Link href="/faq" className="hover:underline hover:text-[#ffcc00]">FAQ</Link>
                        <Link href="/about" className="hover:underline hover:text-[#ffcc00]">About</Link>
                    </div>
                </div>
            </div>

            {/* Right side: Authentication Form */}
            <div className="flex w-full flex-col justify-center px-6 py-12 md:w-1/2 lg:px-16 xl:px-24">
                <div className={`mx-auto w-full ${maxWidth}`}>
                    {/* Logo (visible on mobile only) */}
                    <div className="mb-8 md:hidden text-center">
                        <Link href="/" className="font-serif text-3xl font-black text-[#ffcc00]">
                            QM Cafe & Billiard
                        </Link>
                        <p className="mt-2 text-xs text-[#9aa7b3] tracking-widest uppercase font-bold">
                            Reservation & Ordering System
                        </p>
                    </div>

                    {/* Form container */}
                    <div className="rounded-[16px] border border-[#2b3232]/80 bg-[#151919] p-7 shadow-xl shadow-black/30">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
