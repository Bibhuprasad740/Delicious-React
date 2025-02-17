import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Star, Minus, Plus, ShoppingCart, Leaf, Drumstick } from 'lucide-react';
import { CartItem, FoodItem, Review } from '../types';
import { useCartStore } from '../store/cartStore';
import foodItems from '../dummy_data/food_items_data';
import reviewsDummyData from '../dummy_data/reviews_data';

export default function MealDetails() {
  const { foodItemId } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [meal, setMeal] = useState<FoodItem | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const selectedFood = foodItems.find((item) => item.id === foodItemId);
    if (selectedFood) {
      setMeal(selectedFood);
      setIsLoading(false);
    } else {
      toast.error('No food found with the given ID');
      history.back();
    }

    const filteredReviews = reviewsDummyData.filter((review) => review.foodItemId === foodItemId);
    setReviews(filteredReviews);
    
    setIsLoading(false);
  }, [foodItemId]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!meal) return;

    setIsAddingToCart(true);
    try {
      const cartItem: CartItem = {
        id: crypto.randomUUID(),
        foodItem: meal,
        quantity: quantity,
        type: 'regular',
      };
              
      addToCart(cartItem);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading || !meal) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600" />
      </div>
    );
  }

  return (
    <div className="mb-12 min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full px-0 py-0">
        <div className="bg-white p-4 lg:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img
                  src={meal.images[activeImage]}
                  alt={meal.name}
                  className="w-full h-[40vh] object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {meal.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-lg overflow-hidden h-24 transition-all duration-200 ${
                      activeImage === index
                        ? 'ring-2 ring-orange-600 scale-95'
                        : 'hover:opacity-80'
                    }`}
                  >
                    <img src={image} alt={`${meal.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      meal.dietaryType === 'veg'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {meal.dietaryType === 'veg' ? (
                      <Leaf className="h-4 w-4 inline mr-1" />
                    ) : (
                      <Drumstick className="h-4 w-4 inline mr-1" />
                    )}
                    {meal.dietaryType}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                    {meal.calories} calories
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{meal.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < Math.floor(meal.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {meal.rating} ({reviews.length} reviews)
                  </span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{meal.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
                <div className="grid grid-cols-2 gap-3">
                  {meal.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg"
                    >
                      <span className="h-2 w-2 rounded-full bg-orange-600" />
                      <span>{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="items-center justify-between mb-6">
                  <div>
                    <p className="text-4xl font-bold text-gray-900">${meal.price}</p>
                    <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 rounded-md hover:bg-white transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 rounded-md hover:bg-white transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center bg-orange-600 text-white text-lg font-medium px-5 py-3 rounded-lg shadow-md hover:bg-orange-700 transition-all"
                      disabled={isAddingToCart}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white p-6 lg:p-8">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < Math.floor(review.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <span className="text-sm text-gray-500 mt-2 block">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
