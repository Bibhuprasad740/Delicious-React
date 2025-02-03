import { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { FoodItem } from '../types';

interface SearchComponentProps {
    placeholder: string;
    onSearch: (query: string) => void;
    onSelectItem: (item: FoodItem) => void;
    items: FoodItem[];
    selectedItems: FoodItem[];
}

const SearchComponent = ({ placeholder, onSearch, onSelectItem, items, selectedItems }: SearchComponentProps) => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredItems = items.filter(
        (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) &&
            !selectedItems.find((selected) => selected.id === item.id)
    );

    return (
        <div className="relative" ref={searchRef}>
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        onSearch(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {showSuggestions && query && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-96 overflow-y-auto">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    onSelectItem(item);
                                    setQuery('');
                                    setShowSuggestions(false);
                                }}
                                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-none justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <span className="font-medium">{item.name}</span>
                                </div>
                                <span className="text-sm text-gray-600">${item.price.toFixed(2)}</span>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">No items found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;