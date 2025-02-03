import { Star } from 'lucide-react';
import { Link } from 'react-router-dom'
import foodItems from '../dummy_data/food_items_data';
import { Review } from '../types';

interface ReviewCardProps {
    review: Review,
}

const ReviewCard: React.FC<ReviewCardProps> = ({review}) => {

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
        return foodItem;
    }

    return (
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
    )
}

export default ReviewCard
