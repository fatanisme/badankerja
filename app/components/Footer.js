import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <footer className="bg-white py-4">
            <hr className="my-4 border-t border-gray-300" />

            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-gray-600">
                    <h1 className="text-2xl font-bold text-blue-600">BADANKERJA.</h1>
                </div>
                <div className="flex space-x-6">
                    <a href="https://www.instagram.com/badankerja" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Instagram</span>
                        <Instagram />
                    </a>
                    <a href="https://twitter.com/badankerja" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <Twitter />
                    </a>
                    <a href="https://www.linkedin.com/company/badankerja/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin />
                    </a>
                    <a href="https://www.facebook.com/badankerja" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Facebook</span>
                        <Facebook />
                    </a>
                </div>
            </div>
            <div className="text-center text-gray-400 py-3">
                <p>&copy; {currentYear} BADANKERJA. All rights reserved.</p>
            </div>
        </footer>
    );
}
