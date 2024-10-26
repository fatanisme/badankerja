import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function SearchForm({ onSearch, onClear, searchTerm, setSearchTerm, placeholderText }) {
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        onSearch(); // Call search function on submit
    };

    const handleClear = () => {
        setSearchTerm(''); // Clear search input
        onClear(); // Call clear function
    };

    return (
        <form onSubmit={handleSubmit} className="flex relative">
            <Input
                placeholder={placeholderText} // Use the placeholderText prop
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update input value
                className="flex-grow rounded-r-none pr-10"
                aria-label={placeholderText}
            />
            {searchTerm && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Hapus pencarian"
                >
                    <X size={16} />
                </button>
            )}
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 rounded-l-none ml-0">
                Cari
            </Button>
        </form>
    );
}
