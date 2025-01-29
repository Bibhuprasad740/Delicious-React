import React, { useState, useRef, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { FoodItem } from '../types';
import { Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Search, X, Utensils, Coffee } from 'lucide-react';

const foodItems = [
    {
        id: '1',
        name: "Pizza Slice",
        price: 50,
        description: "Fresh baked pizza slice with melted mozzarella and tangy tomato sauce",
        categoryId: "1",
        rating: 4.5,
        calories: 250,
        ingredients: ["mozzarella cheese", "tomato sauce", "pizza dough", "oregano"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1513104890138-7c749659a591",
            "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee"
        ],
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },
    {
        id: '2',
        name: "Mini Burger",
        price: 60,
        description: "Juicy mini burger with premium beef patty and cheddar cheese",
        categoryId: "1",
        rating: 4.3,
        calories: 300,
        ingredients: ["beef patty", "cheddar cheese", "lettuce", "tomato", "burger bun"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            "https://images.unsplash.com/photo-1550317138-10000687a72b"
        ],
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
        id: '3',
        name: "Pasta Bowl",
        price: 70,
        description: "Fresh pasta in rich tomato sauce with basil and parmesan",
        categoryId: "2",
        rating: 4.4,
        calories: 400,
        ingredients: ["penne pasta", "tomato sauce", "basil", "parmesan cheese", "olive oil"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
            "https://images.unsplash.com/photo-1556761223-4c4282c73f77"
        ],
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8"
    },
    {
        id: '4',
        name: "Spring Rolls",
        price: 40,
        description: "Crispy vegetable spring rolls with sweet chili sauce",
        categoryId: "3",
        rating: 4.2,
        calories: 200,
        ingredients: ["cabbage", "carrots", "spring roll wrapper", "mushrooms", "glass noodles"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1544037803-b11e40a76220",
            "https://images.unsplash.com/photo-1536510233921-8e5043fce771"
        ],
        image: "https://images.unsplash.com/photo-1544037803-b11e40a76220"
    },
    {
        id: '5',
        name: "Chicken Wings",
        price: 80,
        description: "Spicy buffalo chicken wings with blue cheese dip",
        categoryId: "1",
        rating: 4.6,
        calories: 450,
        ingredients: ["chicken wings", "buffalo sauce", "butter", "blue cheese dip"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1608039829572-78524f79c4c7",
            "https://images.unsplash.com/photo-1569691899455-88464f6d3ab1"
        ],
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7"
    },
    {
        id: '6',
        name: "Greek Salad",
        price: 55,
        description: "Fresh Greek salad with feta cheese and olives",
        categoryId: "4",
        rating: 4.3,
        calories: 180,
        ingredients: ["cucumber", "tomatoes", "red onion", "feta cheese", "kalamata olives", "olive oil"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1540420773420-3366772f4999",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
        ],
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999"
    },
    {
        id: '7',
        name: "Sushi Roll",
        price: 90,
        description: "California roll with fresh crab meat and avocado",
        categoryId: "5",
        rating: 4.7,
        calories: 320,
        ingredients: ["crab meat", "avocado", "cucumber", "sushi rice", "nori seaweed"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c"
        ],
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351"
    },
    {
        id: '8',
        name: "Mushroom Risotto",
        price: 75,
        description: "Creamy mushroom risotto with truffle oil",
        categoryId: "2",
        rating: 4.5,
        calories: 380,
        ingredients: ["arborio rice", "mushrooms", "parmesan", "white wine", "truffle oil"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
            "https://images.unsplash.com/photo-1549203438-a7696aad3b33"
        ],
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371"
    }
] as FoodItem[];

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

    const filteredItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedItems.find(selected => selected.id === item.id)
    );

    const handleAddItem = (item: FoodItem) => {
        setSelectedItems(prev => [...prev, item]);
        setSearchQuery('');
        setShowSuggestions(false);
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedItems(prev => prev.filter(item => item.id !== itemId));
    };

    const calculateTotalPrice = (): number => {
        let totalPrice = selectedItems.reduce((sum, item) => sum + (item.price / 2), 0) * numPlates;
        totalPrice += includeCutlery ? cutleryPrice * numPlates : 0;
        totalPrice += softDrinkPrice * numSoftDrinks;
        return totalPrice;
    };

    const handleAddToCart = () => {
        if (selectedItems.length === 0) return;

        const birthdayPlatter = {
            id: 'birthday-platter-' + Date.now(),
            name: 'Birthday Platter',
            description: `Includes: ${selectedItems.map(i => i.name).join(', ')}`,
            price: calculateTotalPrice(),
            image: selectedItems[0].image,
            categoryId: 'special',
            rating: 5,
            calories: selectedItems.reduce((sum, item) => sum + item.calories, 0),
            ingredients: selectedItems.flatMap(item => item.ingredients),
            dietaryType: selectedItems.some(item => item.dietaryType === 'non-veg') ? 'non-veg' : 'veg',
            images: selectedItems.map(item => item.image),
        };

        try {
            addToCart(birthdayPlatter, numPlates);
            setSelectedItems([]);
            setNumPlates(1);
            setIncludeCutlery(false);
            setNumSoftDrinks(0);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div className="relative bg-gradient-to-r from-orange-500 to-orange-700 text-white p-10 rounded-2xl shadow-lg">
                <div className="absolute top-4 left-4 text-4xl">
                    <Zap className="text-yellow-300" size={40} />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <motion.img
                        src="/images/heading-image.png"
                        alt="Heading Visual"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold">Welcome to Birthday Special</h1>
                        <p className="text-lg mt-2">Choose your food from a our menu and get a minimum 50% discount.</p>
                        <button className="mt-4 bg-white text-orange-700 font-semibold px-4 py-2 rounded-lg hover:bg-orange-200 transition shadow-md">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="relative" ref={searchRef}>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search food items..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* Search Suggestions */}
                {showSuggestions && searchQuery && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-96 overflow-y-auto">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleAddItem(item)}
                                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-none"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className="ml-3 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{item.name}</span>
                                            <span className="text-sm text-gray-600">
                                                ${(item.price / 2).toFixed(2)}
                                            </span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${item.dietaryType === 'veg'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {item.dietaryType}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No items found
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Selected Items */}
            {selectedItems.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Selected Items</h3>
                    <div className="grid gap-3">
                        {selectedItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-600">
                                            ${(item.price / 2).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="p-1 hover:bg-gray-200 rounded-full"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Options */}
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
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Coffee className="w-5 h-5 text-gray-500" />
                            <span>Soft Drinks</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setNumSoftDrinks(prev => Math.max(0, prev - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                            >
                                -
                            </button>
                            <span className="w-8 text-center">{numSoftDrinks}</span>
                            <button
                                onClick={() => setNumSoftDrinks(prev => prev + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span>Number of Plates</span>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setNumPlates(prev => Math.max(1, prev - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                            >
                                -
                            </button>
                            <span className="w-8 text-center">{numPlates}</span>
                            <button
                                onClick={() => setNumPlates(prev => prev + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total Price</span>
                        <span>${calculateTotalPrice().toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full py-3 bg-orange-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default BirthdaySpecial;