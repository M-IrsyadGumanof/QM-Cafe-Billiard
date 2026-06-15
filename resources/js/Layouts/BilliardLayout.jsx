import { Link, usePage } from '@inertiajs/react';

export default function BilliardLayout({ children }) {
    const { url } = usePage();

    const navItems = [
        { href: route('billiard.dashboard'), label: 'Dashboard', match: '/billiard/dashboard' },
        { href: route('billiard.reservations.index'), label: 'Reservations', match: '/billiard/reservations' },
        { href: route('billiard.table-schedule.index'), label: 'Table Schedule', match: '/billiard/table-schedule' },
        { href: route('billiard.sessions.index'), label: 'Playing Sessions', match: '/billiard/sessions' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="px-6 py-5 border-b border-gray-700">
                    <h1 className="text-lg font-bold">QM Billiard</h1>
                    <p className="text-xs text-gray-400">Staff Panel</p>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                url.startsWith(item.match)
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="px-4 py-4 border-t border-gray-700">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                        QM Cafe & Billiard
                    </h2>
                    <span className="text-sm text-gray-500">Billiard Staff</span>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}