import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategories([
          {
            id: '1',
            name: 'Main Dishes',
            description: 'Delicious main courses from around the world',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
            itemCount: 24
          },
          {
            id: '2',
            name: 'Appetizers',
            description: 'Start your meal right with our appetizers',
            image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
            itemCount: 16
          },
          {
            id: '3',
            name: 'Desserts',
            description: 'Sweet treats to end your meal',
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800',
            itemCount: 12
          }
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="w-16 h-16 relative animate-spin">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative h-72 bg-indigo-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Menu</h1>
          <p className="text-lg text-white/90 max-w-xl">
            Explore our carefully curated selection of dishes, crafted with passion and the finest ingredients
          </p>
        </div>
      </div>

      {/* Categories List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map((category, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            key={category.id}
            className="mb-6"
          >
            <Link
              to={`/menu/category/${category.id}`}
              className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="w-32 h-32 flex-shrink-0 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="text-sm font-medium text-gray-700 flex items-center">
                  {category.itemCount} items
                  <ChevronRight className="ml-2 h-4 w-4 text-gray-500" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
