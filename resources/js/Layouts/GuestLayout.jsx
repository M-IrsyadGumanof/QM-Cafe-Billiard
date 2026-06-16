import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#151919] px-4 pt-6 text-white sm:justify-center sm:pt-0">
            <Link href="/" className="font-serif text-3xl font-black text-[#ffcc00]">
                QM Cafe & Billiard
            </Link>
            <p className="mt-2 text-sm text-[#9aa7b3]">Dark premium reservation and ordering system</p>

            <div className="mt-6 w-full overflow-hidden rounded-[7px] border border-[#2b3232] bg-[#1d2222] px-6 py-5 shadow-xl sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
