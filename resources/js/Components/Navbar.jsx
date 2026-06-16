import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Detect scroll for glassmorphism effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [url]);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/menu", label: "Menu" },
        { href: "/booking", label: "Booking" },
        { href: "/gallery", label: "Gallery" },
        { href: "/testimonials", label: "Testimonials" },
        { href: "/faq", label: "FAQ" },
    ];

    const isActive = (href) => {
        if (href === "/") return url === "/";
        return url.startsWith(href);
    };

    return (
        <nav
            className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-[#181A1B]/90 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-[#FFC800]/10"
                    : "bg-[#181A1B] border-b border-neutral-800"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 group"
                >
                    <h1 className="font-playfairDisplay text-2xl font-bold text-[#FFC800] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,200,0,0.6)] group-hover:scale-105">
                        QM
                    </h1>
                    <p className="text-sm text-gray-400 font-inter transition-colors duration-300 group-hover:text-gray-200">
                        Cafe & Billiard
                    </p>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                                isActive(link.href)
                                    ? "text-[#FFC800]"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {/* Link text */}
                            <span className="relative z-10">{link.label}</span>

                            {/* Hover background glow */}
                            <span className="absolute inset-0 rounded-lg bg-[#FFC800]/0 group-hover:bg-[#FFC800]/10 transition-all duration-300" />

                            {/* Animated underline - slides from left */}
                            <span
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#FFC800] to-transparent transition-all duration-300 ${
                                    isActive(link.href)
                                        ? "w-3/4 opacity-100"
                                        : "w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100"
                                }`}
                            />
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons + Hamburger */}
                <div className="flex items-center gap-3">
                    {/* Login */}
                    <Link
                        href="/login"
                        className="hidden md:inline-block relative text-sm text-gray-300 font-medium px-4 py-2 rounded-lg overflow-hidden group transition-all duration-300 hover:text-white"
                    >
                        <span className="relative z-10">Login</span>
                        <span className="absolute inset-0 rounded-lg border border-gray-600 group-hover:border-[#FFC800]/50 transition-all duration-300" />
                    </Link>

                    {/* Register */}
                    <Link
                        href="/register"
                        className="hidden md:inline-block relative text-sm text-black font-semibold px-5 py-2 rounded-lg overflow-hidden group transition-all duration-300"
                    >
                        <span className="relative z-10">Register</span>
                        <span className="absolute inset-0 bg-[#FFC800] group-hover:bg-yellow-300 transition-all duration-300" />
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(255,200,0,0.4)]" />
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
                        aria-label="Toggle navigation menu"
                    >
                        <span
                            className={`block w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-300 group-hover:bg-[#FFC800] ${
                                mobileOpen
                                    ? "rotate-45 translate-y-2"
                                    : ""
                            }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-300 group-hover:bg-[#FFC800] ${
                                mobileOpen ? "opacity-0 scale-0" : ""
                            }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-300 group-hover:bg-[#FFC800] ${
                                mobileOpen
                                    ? "-rotate-45 -translate-y-2"
                                    : ""
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-6 pb-6 pt-2 space-y-1 bg-[#181A1B]/95 backdrop-blur-xl border-t border-neutral-800">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                isActive(link.href)
                                    ? "text-[#FFC800] bg-[#FFC800]/10"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                            style={{
                                transitionDelay: mobileOpen
                                    ? `${index * 50}ms`
                                    : "0ms",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Mobile Auth */}
                    <div className="flex gap-3 pt-4 border-t border-neutral-700 mt-3">
                        <Link
                            href="/login"
                            className="flex-1 text-center text-sm text-gray-300 font-medium px-4 py-2.5 rounded-lg border border-gray-600 hover:border-[#FFC800]/50 hover:text-white transition-all duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="flex-1 text-center text-sm text-black font-semibold px-4 py-2.5 rounded-lg bg-[#FFC800] hover:bg-yellow-300 transition-all duration-300"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}