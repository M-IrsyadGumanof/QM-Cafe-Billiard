import { Link } from "@inertiajs/react";
import Flash from "@/Components/Shared/Flash";
export default function OwnerLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#151919] text-white">
            <header className="border-b border-[#2b3232] bg-[#111515] px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/owner/dashboard"
                        className="font-serif text-xl font-black text-[#ffcc00]"
                    >
                        QM Owner
                    </Link>
                    <nav className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                        <Link href="/" className="text-[#9aa7b3] hover:text-white transition-colors duration-200">
                            Lihat Website
                        </Link>
                        <span className="text-[#2b3232]">|</span>
                        <Link href="/owner/dashboard" className="text-[#9aa7b3] hover:text-[#ffcc00] transition-colors duration-200">
                            Dashboard
                        </Link>
                        <Link href="/owner/reports" className="text-[#9aa7b3] hover:text-[#ffcc00] transition-colors duration-200">
                            Reports
                        </Link>
                        <Link method="post" href="/logout" as="button" className="text-[#9aa7b3] hover:text-red-400 transition-colors duration-200">
                            Logout
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-7xl p-6">
                <Flash />
                {children}
            </main>
        </div>
    );
}
