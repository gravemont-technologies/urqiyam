"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const tabs = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Venture', href: '/venture' },
    { name: 'Ideas', href: '/ideas' },
    { name: 'How It Works', href: '/how-it-works' },
];

export default function DashboardNavbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="text-2xl font-bold text-primary">
                            Qiyam
                        </Link>

                        <div className="hidden md:flex space-x-1">
                            {tabs.map((tab) => {
                                const isActive = pathname === tab.href;
                                return (
                                    <Link
                                        key={tab.name}
                                        href={tab.href}
                                        className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors
                                            ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        {tab.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Profile/Logout placeholders */}
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            ME
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Placeholder */}
            {/* Can add mobile menu here if needed */}
        </nav>
    );
}
