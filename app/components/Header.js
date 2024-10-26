"use client";
import { useState } from "react";
import Link from "next/link";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className="w-full bg-white relative">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex-grow flex justify-center">
                    <Link href="/" className="text-4xl font-bold text-blue-600 h-16 flex items-center">
                        BADANKERJA.
                    </Link>
                </div>
                <div className="block md:hidden">
                    <button onClick={toggleMenu} className="text-blue-600 focus:outline-none">
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
                <Link href="/perusahaan" className="hidden md:absolute md:right-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-full font-semibold md:block">
                    Untuk Perusahaan
                </Link>
            </div>

            {/* Divider always visible in normal mode and in mobile mode below the name */}
            <hr className="border-t-2 border-gray-200 w-full md:block hidden" />
            <hr className="border-t-2 border-gray-200 w-full md:hidden" />

            {/* Normal Navigation for Desktop */}
            <nav className="container mx-auto hidden md:block">
                <div className="flex justify-center items-center h-16">
                    <ul className="flex space-x-8">

                        <li>
                            <Link href="/cpns" className="text-gray-600 hover:text-blue-600 font-semibold">
                                CPNS
                            </Link>
                        </li>
                        <li>
                            <Link href="/bumn" className="text-gray-600 hover:text-blue-600 font-semibold">
                                BUMN
                            </Link>
                        </li>
                        <li>
                            <Link href="/swasta" className="text-gray-600 hover:text-blue-600 font-semibold">
                                SWASTA
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className="text-gray-600 hover:text-blue-600 font-semibold">
                                BLOG
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <hr className="border-t-2 border-gray-200 w-full" />

            {/* Fullscreen Modal for Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-between shadow-lg transition-opacity duration-300 ease-in-out">
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <div className="absolute top-4 right-4">
                            <button onClick={toggleMenu} className="text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <nav className="flex flex-col items-center space-y-4">
                            <Link href="/cpns" className="text-gray-600 hover:text-blue-600 font-semibold text-2xl">
                                CPNS
                            </Link>
                            <Link href="/bumn" className="text-gray-600 hover:text-blue-600 font-semibold text-2xl">
                                BUMN
                            </Link>
                            <Link href="/swasta" className="text-gray-600 hover:text-blue-600 font-semibold text-2xl">
                                SWASTA
                            </Link>
                        </nav>
                    </div>
                    <Link href="/perusahaan" className="mb-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-6 rounded-full font-semibold w-1/2 text-center">
                        Untuk Perusahaan
                    </Link>
                </div>
            )}
        </header>
    );
}
