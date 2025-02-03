import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Search, Clock, TrendingUp } from 'lucide-react';
import api from '../lib/axios';
import { FoodItem, Review } from '../types';
import notificationsDummyData from '../dummy_data/notifications_data';
import AppBar from '../components/Appbar';
import FoodItemCard from '../components/FoodItemCard';
import ReviewCard from '../components/ReviewCard';
import SidePanel from '../components/SidePannel';
import users from '../dummy_data/users_data';
import foodItems from '../dummy_data/food_items_data';
import reviewsDummyData from '../dummy_data/reviews_data';

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
      <SidePanel
        isOpen={showSidePanel}
        onClose={handleSidePanelToggle}
        isDarkTheme={isDarkTheme}
        onToggleDarkTheme={handleDarkThemeToggle}
        isGridLayout={isGridLayout}
        onToggleLayout={handleLayoutToggle}
        user={users[1]}
      />

      {/* Meal of the Day Banner */}
      {mealOfDay && (
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8 group">
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
      <div className="relative mb-8">
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
            <FoodItemCard key={item.id} item={item} />
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
            <ReviewCard key={review.id} review={review} />
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
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}