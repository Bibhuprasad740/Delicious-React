import { Link, useNavigate } from 'react-router-dom';
import {ShoppingBag, MapPin, Cake, Coffee, Calendar } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CartItem } from '../types';
import MealTypeSection from '../components/MealTypeSection';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart } = useCartStore();

  // Group items by type
  const groupedItems = items.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.foodItem.price * item.quantity,
      0
    );
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-4">Add some delicious meals to get started!</p>
        <Link
          to="/"
          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Use MealTypeSection for different meal types */}
          {Object.keys(groupedItems).map(type => (
            <MealTypeSection
              key={type}
              type={type}
              items={groupedItems[type]}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {/* Display birthday specials summary if they exist */}
              {groupedItems['birthday-special'] && groupedItems['birthday-special'].length > 0 && (
                <div className="flex items-center justify-between text-orange-700 bg-orange-50 p-2 rounded-md">
                  <div className="flex items-center">
                    <Cake className="h-4 w-4 mr-2" />
                    <p>Birthday Special Items</p>
                  </div>
                  <p>
                    ${groupedItems['birthday-special'].reduce(
                      (total, item) => total + item.foodItem.price * item.quantity,
                      0
                    ).toFixed(2)}
                  </p>
                </div>
              )}

              {/* Display monthly meal summary if they exist */}
              {groupedItems['monthly-meal'] && groupedItems['monthly-meal'].length > 0 && (
                <div className="flex items-center justify-between text-green-700 bg-green-50 p-2 rounded-md">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <p>Monthly Special Items</p>
                  </div>
                  <p>
                    ${groupedItems['monthly-meal'].reduce(
                      (total, item) => total + item.foodItem.price * item.quantity,
                      0
                    ).toFixed(2)}
                  </p>
                </div>
              )}

              {/* Display regular items summary if they exist */}
              {groupedItems['regular'] && groupedItems['regular'].length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Coffee className="h-4 w-4 mr-2 text-gray-600" />
                    <p className="text-gray-600">Regular Menu Items</p>
                  </div>
                  <p className="text-gray-900">
                    ${groupedItems['regular'].reduce(
                      (total, item) => total + item.foodItem.price * item.quantity,
                      0
                    ).toFixed(2)}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-900">${calculateTotal().toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Delivery Fee</p>
                <p className="text-gray-900">$5.00</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">Total</p>
                  <p className="text-lg font-medium text-gray-900">
                    ${(calculateTotal() + 5).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/address-selection')}
                className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition-colors"
              >
                <MapPin className="h-5 w-5" />
                <span>Choose Delivery Address</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}