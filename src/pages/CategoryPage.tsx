import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FoodItem } from '../types';

const dummyFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Grilled Salmon Bowl',
    description: 'Fresh Atlantic salmon served with quinoa, roasted vegetables, and our signature sauce',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    categoryId: '1',
    rating: 4.8,
    calories: 650,
    ingredients: ['Salmon', 'Quinoa', 'Vegetables', 'Sauce'],
    dietaryType: 'non-veg',
    images: ['https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800'],
  },
  // Add more dummy food items here...
];

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filteredItems = dummyFoodItems.filter((item) => item.categoryId === categoryId);
    setFoodItems(filteredItems);
    setIsLoading(false);
  }, [categoryId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foodItems.map((item) => (
          <Link key={item.id} to={`/meal/${item.id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
