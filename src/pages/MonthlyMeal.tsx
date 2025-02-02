import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { FoodItem } from '../types';
import { Zap, Search, X, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import foodItems from '../dummy_data/food_items_data';

const cutleryPrice = 10; // per plate

const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night'];

const MonthlyMeal = () => {
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<{ timeSlot: string; items: FoodItem[] }[]>([]);
    const [includeCutlery, setIncludeCutlery] = useState(false);
    const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>({});
    const [showSuggestions, setShowSuggestions] = useState<{ [key: string]: boolean }>({});
    const searchRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const addToCart = useCartStore((state) => state.addToCart);

    // Handle clicks outside search suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            Object.keys(searchRefs.current).forEach((timeSlot) => {
                if (searchRefs.current[timeSlot] && !searchRefs.current[timeSlot]?.contains(event.target as Node)) {
                    setShowSuggestions((prev) => ({ ...prev, [timeSlot]: false }));
                }
            });
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAddItem = (item: FoodItem, timeSlot: string) => {
        // Check if the item is already added for the selected time slot
        const existingSlot = selectedItems.find((slot) => slot.timeSlot === timeSlot);
        if (existingSlot && existingSlot.items.some((i) => i.id === item.id)) {
            alert('This item is already added for this time slot.');
            return;
        }

        setSelectedItems((prev) => {
            const existingSlot = prev.find((slot) => slot.timeSlot === timeSlot);
            if (existingSlot) {
                return prev.map((slot) =>
                    slot.timeSlot === timeSlot ? { ...slot, items: [...slot.items, item] } : slot
                );
            } else {
                return [...prev, { timeSlot, items: [item] }];
            }
        });
        setSearchQueries((prev) => ({ ...prev, [timeSlot]: '' }));
        setShowSuggestions((prev) => ({ ...prev, [timeSlot]: false }));
    };

    const handleRemoveItem = (itemId: string, timeSlot: string) => {
        setSelectedItems((prev) =>
            prev.map((slot) =>
                slot.timeSlot === timeSlot
                    ? { ...slot, items: slot.items.filter((item) => item.id !== itemId) }
                    : slot
            )
        );
    };

    const calculateTotalPrice = (): number => {
        let totalPrice = selectedItems.reduce((sum, slot) =>
            sum + slot.items.reduce((itemSum, item) => itemSum + item.price, 0), 0);
        totalPrice += includeCutlery ? cutleryPrice * selectedItems.length : 0;
        return totalPrice;
    };

    const handleAddToCart = () => {
        if (selectedItems.length === 0) return;

        const monthlyMealPlan = {
            id: 'monthly-meal-' + Date.now(),
            name: 'Monthly Meal Plan',
            description: `Includes: ${selectedItems.map((slot) => `${slot.timeSlot}: ${slot.items.map((i) => i.name).join(', ')}`).join('; ')}`,
            price: calculateTotalPrice(),
            image: selectedItems[0].items[0].image,
            categoryId: 'monthly',
            rating: 5,
            calories: selectedItems.reduce((sum, slot) => sum + slot.items.reduce((itemSum, item) => itemSum + item.calories, 0), 0),
            ingredients: selectedItems.flatMap((slot) => slot.items.flatMap((item) => item.ingredients)),
            dietaryType: selectedItems.some((slot) => slot.items.some((item) => item.dietaryType === 'non-veg')) ? 'non-veg' : 'veg',
            images: selectedItems.flatMap((slot) => slot.items.map((item) => item.image)),
        };

        try {
            addToCart(monthlyMealPlan, 1);
            setSelectedItems([]);
            setIncludeCutlery(false);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    return (
        <div className="mb-12 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-green-500 to-green-700 text-white p-8 rounded-2xl shadow-lg">
                <div className="absolute top-4 left-4">
                    <Zap className="text-yellow-300 w-10 h-10" />
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-2">Monthly Meal Plan</h1>
                    <p className="text-lg">Customize your daily meals and enjoy a discount!</p>
                </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Select Time Slots</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {timeSlots.map((slot) => (
                        <button
                            key={slot}
                            onClick={() => {
                                if (selectedTimeSlots.includes(slot)) {
                                    // Deselect the time slot
                                    setSelectedTimeSlots((prev) => prev.filter((t) => t !== slot));
                                    // Remove items for the deselected time slot
                                    setSelectedItems((prev) => prev.filter((s) => s.timeSlot !== slot));
                                } else {
                                    // Select the time slot
                                    setSelectedTimeSlots((prev) => [...prev, slot]);
                                }
                            }}
                            className={`p-4 rounded-xl ${selectedTimeSlots.includes(slot)
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                } hover:bg-green-100 hover:text-green-800 transition-colors`}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search and Selection for Each Time Slot */}
            {selectedTimeSlots.map((timeSlot) => {
                const filteredItems = foodItems.filter((item) =>
                    item.name.toLowerCase().includes((searchQueries[timeSlot] || '').toLowerCase())
                );

                return (
                    <div key={timeSlot} className="space-y-4">
                        <h3 className="font-semibold text-gray-700">{timeSlot} Meals</h3>
                        <div className="relative" ref={(el) => (searchRefs.current[timeSlot] = el)}>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder={`Search food items for ${timeSlot}...`}
                                    value={searchQueries[timeSlot] || ''}
                                    onChange={(e) => {
                                        setSearchQueries((prev) => ({ ...prev, [timeSlot]: e.target.value }));
                                        setShowSuggestions((prev) => ({ ...prev, [timeSlot]: true }));
                                    }}
                                    onFocus={() => setShowSuggestions((prev) => ({ ...prev, [timeSlot]: true }))}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {showSuggestions[timeSlot] && searchQueries[timeSlot] && (
                                <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-96 overflow-y-auto">
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => handleAddItem(item, timeSlot)}
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

                        {/* Selected Items for the Time Slot */}
                        {selectedItems.find((slot) => slot.timeSlot === timeSlot)?.items.map((item) => (
                            <motion.div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id, timeSlot)}
                                    className="p-1 hover:bg-gray-200 rounded-full"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                );
            })}

            {/* Options Section */}
            {selectedItems.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Utensils className="w-5 h-5 text-gray-500" />
                            <span>Include cutlery</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeCutlery}
                                onChange={(e) => setIncludeCutlery(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total Price</span>
                        <span>${calculateTotalPrice().toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default MonthlyMeal;