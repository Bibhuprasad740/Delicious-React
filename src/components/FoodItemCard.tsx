import { Link } from 'react-router-dom'
import { Star } from 'lucide-react';
import { FoodItem } from '../types';

interface FoodItemCardProps {
    item: FoodItem;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item }) => {

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

    return (
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
    )
}

export default FoodItemCard
