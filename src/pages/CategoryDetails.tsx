import { Link, useParams } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import foodItems from '../dummy_data/food_items_data';
import categories from '../dummy_data/categories_data';
import FoodItemCard from '../components/FoodItemCard';

export default function CategoryDetails() {
    const { categoryId } = useParams();
    const filteredFoods = foodItems.filter((food) => food.categoryId === categoryId);
    const category = categories.find(c => c.id === categoryId);

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <div className="mb-12 min-h-screen bg-gray-100 p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                    <h1 className="text-2xl font-bold">{category?.name}</h1>
                </div>
                <Link to="/menu" className="text-orange-600 hover:text-orange-700 font-medium">
                    Back to Menu
                </Link>
            </div>
            <p className="text-gray-600 mb-8">{category?.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredFoods?.map((item) => (
                    <FoodItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}