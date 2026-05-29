export default function Footer() {
    return (
        <footer className="bg-[#1B1B1B] border-t border-neutral-800 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

                <div>
                    <h2 className="text-yellow-400 font-bold text-xl mb-4">
                        QM Cafe & Billiard
                    </h2>

                    <p className="text-gray-400 text-sm leading-6">
                        Premium cafe and billiard experience.
                        Enjoy great food, drinks, and games
                        in an elegant atmosphere.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">
                        Contact
                    </h3>

                    <div className="space-y-2 text-sm text-gray-400">
                        <p>Jl. Sudirman No.123, Jakarta</p>
                        <p>+62 812 3456 7890</p>
                        <p>info@qmcafe.com</p>
                        <p>10:00 AM - 12:00 AM</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">
                        Follow Us
                    </h3>

                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-neutral-700 rounded-md text-gray-400 text-sm hover:border-yellow-400 hover:text-yellow-400 transition">
                            Instagram
                        </button>

                        <button className="px-4 py-2 border border-neutral-700 rounded-md text-gray-400 text-sm hover:border-yellow-400 hover:text-yellow-400 transition">
                            Facebook
                        </button>

                        <button className="px-4 py-2 border border-neutral-700 rounded-md text-gray-400 text-sm hover:border-yellow-400 hover:text-yellow-400 transition">
                            Twitter
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-neutral-800 py-5 text-center text-sm text-gray-500">
                © 2025 QM Cafe & Billiard. All rights reserved.
            </div>
        </footer>
    );
}