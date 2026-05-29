import { Link } from "@inertiajs/react";

export default function Navbar() {
    return (
        <nav className="w-full border-b border-neutral-800 bg-[#181A1B]">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <h1 className="font-playfairDisplay text-2xl font-bold text-[#FFC800]">
                        QM
                    </h1>

                    <p className="text-sm text-gray-400 font-inter">
                        Cafe & Billiard
                    </p>
                </div>

                {/* Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm text-gray-400 hover:text-[#FFC800] transition"
                    >
                        Home
                    </Link>

                    <Link
                        href="/menu"
                        className="text-sm text-gray-400 hover:text-[#FFC800] transition"
                    >
                        Menu
                    </Link>

                    <Link
                        href="/booking"
                        className="text-sm text-gray-400 hover:text-[#FFC800] transition"
                    >
                        Booking
                    </Link>

                    <Link
                        href="/gallery"
                        className="text-sm text-gray-400 hover:text-[#FFC800] transition"
                    >
                        Gallery
                    </Link>

                    <Link
                        href="/testimonials"
                        className="text-sm text-gray-400 hover:text-[#FFC800] transition"
                    >
                        Testimonials
                    </Link>

                    <Link
                        href="/faq"
                        className="text-sm text-gray-400 hover:text-[#FFC800] transition"
                    >
                        FAQ
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="text-sm text-gray-300 hover:text-white transition"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="bg-[#FFC800] hover:bg-yellow-400 text-black text-sm px-4 py-2 rounded-md transition"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}