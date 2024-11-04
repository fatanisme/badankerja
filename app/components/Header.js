"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import qs from "qs";
import Analytics from '../components/analytics/Analytics'

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menus, setMenus] = useState([]);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const fetchLinks = async () => {
            const menuUrl =
                `${strapiUrl}/menus?` +
                qs.stringify({
                    fields: ["name", "url", "publishedAt", "visible", "order"],
                    sort: ["order:asc"], // Sort by order
                    pagination: { pageSize: 10 },
                });
            try {
                const response = await fetch(menuUrl);
                const data = await response.json();

                // Check if data is an array
                if (Array.isArray(data.data)) {
                    // Filter and sort the menus
                    const formattedLinks = data.data
                        .filter(menu => menu.visible) // Keep only visible menus
                        .map(menu => ({
                            id: menu.id,
                            title: menu.name,
                            url: menu.url,
                        }));
                    setMenus(formattedLinks);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };

        fetchLinks();
    }, []);

    return (
        <header className="w-full bg-white relative">
            <Analytics />
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
                {/* <Link href="/perusahaan" className="hidden md:absolute md:right-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-full font-semibold md:block">
                    Untuk Perusahaan
                </Link> */}
            </div>

            <hr className="border-t-2 border-gray-200 w-full md:block hidden" />
            <hr className="border-t-2 border-gray-200 w-full md:hidden" />

            {/* Normal Navigation for Desktop */}
            <nav className="container mx-auto hidden md:block">
                <div className="flex justify-center items-center h-16">
                    <ul className="flex space-x-8">
                        {menus.map((menu) => (
                            <li key={menu.id}>
                                <Link href={menu.url} className="text-gray-600 hover:text-blue-600 font-semibold">
                                    {menu.title}
                                </Link>
                            </li>
                        ))}
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
                            {menus.map((menu) => (
                                <Link key={menu.id} href={menu.url} className="text-gray-600 hover:text-blue-600 font-semibold text-2xl">
                                    {menu.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    {/* <Link href="/perusahaan" className="mb-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-6 rounded-full font-semibold w-1/2 text-center">
                        Untuk Perusahaan
                    </Link> */}
                </div>
            )}
        </header>
    );
}
