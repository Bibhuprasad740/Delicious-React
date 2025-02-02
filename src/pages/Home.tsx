import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Search, Clock, TrendingUp, Bell, Menu, LogOut, User, Moon, Sun, Grid, List, Palette, LayoutGrid, Users, Settings, HelpCircle, Shield, X } from 'lucide-react';
import api from '../lib/axios';
import { FoodItem, Review } from '../types';
import foodItems from '../dummy_data/food_items_data';
import reviewsDummyData from '../dummy_data/reviews_data';
import notificationsDummyData from '../dummy_data/notifications_data';
import AppBar from '../components/Appbar';

export default function Home() {
  const [mealOfDay, setMealOfDay] = useState<FoodItem | null>(null);
  const [mostPopularDishes, setMostPopularDishes] = useState<FoodItem[]>([]);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isGridLayout, setIsGridLayout] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // randomly choose any index from foodItems array
        let randomIndex = Math.floor(Math.random() * foodItems.length);
        setMealOfDay(foodItems[randomIndex]);
        setMostPopularDishes([foodItems[(randomIndex + 1) % foodItems.length], foodItems[(randomIndex + 2) % foodItems.length], foodItems[(randomIndex + 3) % foodItems.length]]);

        randomIndex = Math.floor(Math.random() * reviewsDummyData.length);

        setRecentReviews([
          reviewsDummyData[randomIndex],
          reviewsDummyData[(randomIndex + 1) % reviewsDummyData.length],
        ]);

        setRecentlyViewed([foodItems[(randomIndex + 4) % foodItems.length], foodItems[(randomIndex + 5) % foodItems.length], foodItems[(randomIndex + 6) % foodItems.length]]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unreadCount = notificationsDummyData.filter((notification) => !notification.isRead).length;
    setUnreadNotifications(unreadCount);
    const darkTheme = localStorage.getItem('darkTheme');
    setIsDarkTheme(darkTheme === 'true');
    document.body.classList.toggle('dark', isDarkTheme);
  }, []);

  const handleSidePanelToggle = () => {
    setShowSidePanel(!showSidePanel);
  };

  const handleDarkThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('darkTheme', isDarkTheme ? 'false' : 'true');
    document.body.classList.toggle('dark');
  };

  const handleLayoutToggle = () => {
    setIsGridLayout(!isGridLayout);
  };

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

  const getFoodItemFromID = (foodItemId: string) => {
    const foodItem = foodItems.find((foodItem) => foodItem.id === foodItemId);
    console.log(foodItem);
    return foodItem;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600" />
      </div>
    );
  }

  return (
    <div className="mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* AppBar */}
      <AppBar unreadNotifications={unreadNotifications}
        handleSidePanelToggle={handleSidePanelToggle} />

      {/* Side Panel (if open) */}
      {showSidePanel && (
        <div className="fixed inset-0 bg-black/50 z-50 transition-opacity">
          <div
            className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300"
          >
            {/* Header with close button */}
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold dark:text-white">Menu</h2>
                <button
                  onClick={handleSidePanelToggle}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* User Profile Section */}
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">John Doe</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                </div>
              </div>
            </div>

            {/* Main Menu Items */}
            <nav className="p-4">
              <div className="space-y-1">
                {/* Preferences Section */}
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex items-center gap-3">
                      <Palette className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium dark:text-white">Theme</span>
                    </div>
                    <button
                      onClick={handleDarkThemeToggle}
                      className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700"
                    >
                      {isDarkTheme ?
                        <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" /> :
                        <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      }
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex items-center gap-3">
                      <LayoutGrid className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium dark:text-white">Layout</span>
                    </div>
                    <button
                      onClick={handleLayoutToggle}
                      className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700"
                    >
                      {isGridLayout ?
                        <Grid className="h-4 w-4 text-gray-500 dark:text-gray-400" /> :
                        <List className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      }
                    </button>
                  </div>
                </div>

                {/* Navigation Links */}
                <Link
                  to="/community"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium dark:text-white">Community</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium dark:text-white">Settings</span>
                </Link>

                <Link
                  to="/help-support"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <HelpCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium dark:text-white">Help & Support</span>
                </Link>

                <Link
                  to="/privacy-policy"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium dark:text-white">Privacy Policy</span>
                </Link>
              </div>
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t dark:border-gray-700">
              <button
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
            <Link key={review.id} to={`/meal/${review.foodItemId}`} className="group">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                    <img
                      src={getFoodItemFromID(review.foodItemId)?.image}
                      alt={getFoodItemFromID(review.foodItemId)?.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{getFoodItemFromID(review.foodItemId)?.name}</h3>
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