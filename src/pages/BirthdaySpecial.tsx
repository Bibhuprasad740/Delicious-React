import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { FoodItem } from '../types';
import foodItems from '../dummy_data/food_items_data';
import SearchComponent from '../components/Search';
import SelectedItem from '../components/SelectedItem';
import OptionsSection from '../components/OptionsSection';
import OfferHeader from '../components/OfferHeader';

const cutleryPrice = 10; // per plate
const softDrinkPrice = 30; // per soft drink

const BirthdaySpecial = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [numPlates, setNumPlates] = useState(1);
    const [includeCutlery, setIncludeCutlery] = useState(false);
    const [numSoftDrinks, setNumSoftDrinks] = useState(0);
    const searchRef = useRef<HTMLDivElement>(null);
    const addToCart = useCartStore((state) => state.addToCart);

    // Handle clicks outside search suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAddItem = (item: FoodItem) => {
        setSelectedItems((prev) => [...prev, item]);
        setSearchQuery('');
        setShowSuggestions(false);
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const calculateTotalPrice = (): number => {
        let totalPrice = selectedItems.reduce((sum, item) => sum + item.price / 2, 0) * numPlates;
        totalPrice += includeCutlery ? cutleryPrice * numPlates : 0;
        totalPrice += softDrinkPrice * numSoftDrinks;
        return totalPrice;
    };

    const handleAddToCart = () => {
        if (selectedItems.length === 0) return;

        const birthdayPlatter = {
            id: 'birthday-platter-' + Date.now(),
            name: 'Birthday Platter',
            description: `Includes: ${selectedItems.map((i) => i.name).join(', ')}`,
            price: calculateTotalPrice(),
            image: selectedItems[0].image,
            categoryId: 'special',
            rating: 5,
            calories: selectedItems.reduce((sum, item) => sum + item.calories, 0),
            ingredients: selectedItems.flatMap((item) => item.ingredients),
            dietaryType: selectedItems.some((item) => item.dietaryType === 'non-veg') ? 'non-veg' : 'veg',
            images: selectedItems.map((item) => item.image),
        };

        try {
            // addToCart(birthdayPlatter, numPlates);
            setSelectedItems([]);
            setNumPlates(1);
            setIncludeCutlery(false);
            setNumSoftDrinks(0);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    return (
        <div className="mb-12 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Header Section */}
            <OfferHeader
                title="Birthday Special"
                subtitle="Choose your favorite dishes and enjoy a 50% discount!"
                gradientFrom="from-orange-500"
                gradientTo="to-orange-700"
            />

            {/* Search Section */}
            <SearchComponent
                placeholder="Search food items..."
                onSearch={(query: string) => setSearchQuery(query)}
                onSelectItem={(item: FoodItem) => handleAddItem(item)}
                items={foodItems}
                selectedItems={selectedItems}
            />

            {/* Selected Items */}
            {selectedItems.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Selected Items</h3>
                    <div className="grid gap-3">
                        {selectedItems.map((item) => (
                            <SelectedItem
                                item={item}
                                onRemoveItem={handleRemoveItem}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Options Section */}
            {selectedItems.length > 0 && (
                <OptionsSection
                    includeCutlery={includeCutlery}
                    onIncludeCutleryChange={setIncludeCutlery}
                    numSoftDrinks={numSoftDrinks}
                    onNumSoftDrinksChange={setNumSoftDrinks}
                    numPlates={numPlates}
                    onNumPlatesChange={setNumPlates}
                    totalPrice={calculateTotalPrice()}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
};

export default BirthdaySpecial;
