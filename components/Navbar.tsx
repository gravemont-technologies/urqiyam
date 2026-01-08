"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            Qiyam
                        </Link>
                    </div>
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        <Link href="/" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link href="#how-it-works" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">How It Works</Link>
                        <Link href="#vision-2030" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Vision 2030</Link>
                        <Link href="#success-stories" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Success Stories</Link>
                        <Link href="#about" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About</Link>
                    </div>
                    <div className="hidden md:flex items-center">
                        <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                            Start Now
                        </Link>
                    </div>
                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block text-gray-900 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link href="#how-it-works" className="block text-gray-500 hover:text-primary px-3 py-2 rounded-md text-base font-medium">How It Works</Link>
                        <Link href="#vision-2030" className="block text-gray-500 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Vision 2030</Link>
                        <Link href="#success-stories" className="block text-gray-500 hover:text-primary px-3 py-2 rounded-md text-base font-medium">Success Stories</Link>
                        <Link href="#about" className="block text-gray-500 hover:text-primary px-3 py-2 rounded-md text-base font-medium">About</Link>
                        <Link href="/login" className="block w-full text-center bg-primary text-white px-4 py-2 rounded-md text-base font-medium hover:bg-primary/90 mt-4">
                            Start Now
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
