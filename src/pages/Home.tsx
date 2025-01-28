import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Search, Clock, TrendingUp } from 'lucide-react';
import api from '../lib/axios';
import { FoodItem, Review } from '../types';

export default function Home() {
  const [mealOfDay, setMealOfDay] = useState<FoodItem | null>(null);
  const [mostPopularDishes, setMostPopularDishes] = useState<FoodItem[]>([]);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMealOfDay({
          id: '1',
          name: 'Grilled Salmon Bowl',
          description: 'Fresh Atlantic salmon served with quinoa, roasted vegetables, and our signature sauce',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
          categoryId: '1',
          rating: 4.8,
          calories: 650,
          ingredients: ['Atlantic Salmon', 'Quinoa', 'Roasted Vegetables', 'Signature Sauce'],
          dietaryType: 'non-veg',
          images: ['https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800']
        });

        setMostPopularDishes([
          {
            id: '1',
            name: 'Grilled Salmon Bowl',
            description: 'Fresh Atlantic salmon served with quinoa, roasted vegetables',
            price: 24.99,
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
            categoryId: '1',
            rating: 4.8,
            calories: 650,
            ingredients: ['Salmon', 'Quinoa', 'Vegetables'],
            dietaryType: 'non-veg',
            images: ['https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800']
          },
          {
            id: '2',
            name: 'Chicken Tikka Masala',
            description: 'Tender chicken in a rich, creamy tomato sauce',
            price: 18.99,
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
            categoryId: '2',
            rating: 4.6,
            calories: 750,
            ingredients: ['Chicken', 'Tomato Sauce', 'Spices'],
            dietaryType: 'non-veg',
            images: ['https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800']
          },
        ]);

        setRecentReviews([
          {
            id: '1',
            userId: 'user1',
            userName: 'John Doe',
            foodId: '1',
            foodName: 'Grilled Salmon Bowl',
            foodImage: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
            rating: 4.5,
            comment: 'Absolutely loved the fresh salmon and the combination of flavors. The quinoa was perfectly cooked!',
            createdAt: '2024-10-27T10:00:00Z',
          },
          {
            id: '2',
            userId: 'user2',
            userName: 'Jane Smith',
            foodId: '2',
            foodName: 'Chicken Tikka Masala',
            foodImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
            rating: 5,
            comment: 'The best Tikka Masala I\'ve had in a long time. Rich flavors and generous portions!',
            createdAt: '2024-10-27T12:00:00Z',
          },
        ]);

        setRecentlyViewed([
          {
            id: '3',
            name: 'Vegetable Stir Fry',
            description: 'Fresh seasonal vegetables in a savory sauce',
            price: 16.99,
            image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800',
            categoryId: '3',
            rating: 4.3,
            calories: 450,
            ingredients: ['Mixed Vegetables', 'Tofu', 'Sauce'],
            dietaryType: 'veg',
            images: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800']
          },
          {
            id: '4',
            name: 'Sushi Platter',
            description: 'Assorted fresh sushi rolls',
            price: 28.99,
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
            categoryId: '4',
            rating: 4.9,
            calories: 550,
            ingredients: ['Rice', 'Fish', 'Nori'],
            dietaryType: 'non-veg',
            images: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800']
          },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.floor(rating)
          ? 'text-yellow-400 fill-yellow-400'
          : 'text-gray-300'
          }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Meal of the Day Banner */}
      {mealOfDay && (
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-16 group">
          <img
            src={mealOfDay.image}
            alt={mealOfDay.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
            <div className="flex items-center space-x-2 mb-4">
              {renderStars(mealOfDay.rating)}
              <span className="ml-2 text-white/90">{mealOfDay.rating}/5</span>
            </div>
            <h1 className="text-5xl font-bold mb-2">Meal of the Day</h1>
            <h2 className="text-3xl mb-4">{mealOfDay.name}</h2>
            <p className="text-lg mb-6 text-white/90 max-w-2xl">{mealOfDay.description}</p>
            <Link
              to={`/meal/${mealOfDay.id}`}
              className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Order Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for your favorite dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-4 border-0 ring-1 ring-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-shadow text-lg"
        />
      </div>

      {/* Most Popular Dishes */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold">Most Popular Dishes</h2>
          </div>
          <Link to="/menu" className="text-orange-600 hover:text-orange-700 font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mostPopularDishes.map((item) => (
            <Link key={item.id} to={`/meal/${item.id}`} className="group">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(item.rating)}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div
                        className={`flex items-center justify-center w-4 h-4 border-2 rounded-sm ${item.dietaryType === 'veg' ? 'border-green-700' : 'border-red-700'
                          }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${item.dietaryType === 'veg' ? 'bg-green-700' : 'bg-red-700'
                            }`}
                        ></div>
                      </div>
                    </div>

                    <span className="text-sm text-gray-500">{item.calories} cal</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-8">
          <Star className="h-6 w-6 text-orange-600 fill-orange-600" />
          <h2 className="text-2xl font-bold">Recent Reviews</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentReviews.map((review) => (
            <Link key={review.id} to={`/meal/${review.foodId}`} className="group">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                    <img
                      src={review.foodImage}
                      alt={review.foodName}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{review.foodName}</h3>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{review.comment}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{review.userName}</span>
                      <span className="text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div>
        <div className="flex items-center gap-2 mb-8">
          <Clock className="h-6 w-6 text-orange-600" />
          <h2 className="text-2xl font-bold">Recently Viewed</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentlyViewed.map((item) => (
            <Link key={item.id} to={`/meal/${item.id}`} className="group">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(item.rating)}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div
                        className={`flex items-center justify-center w-4 h-4 border-2 rounded-sm ${item.dietaryType === 'veg' ? 'border-green-700' : 'border-red-700'
                          }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${item.dietaryType === 'veg' ? 'bg-green-700' : 'bg-red-700'
                            }`}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{item.calories} cal</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}