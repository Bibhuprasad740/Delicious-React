import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, MapPin } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart } = useCartStore();

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.item.price * item.quantity,
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
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {items.map((cartItem) => (
                <li key={cartItem.item.id} className="p-6">
                  <div className="flex items-center">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {cartItem.item.name}
                        </h3>
                        <p className="text-lg font-medium text-gray-900">
                          ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {cartItem.item.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                            disabled={cartItem.quantity <= 1}
                          >
                            <Minus className="h-5 w-5 text-gray-500" />
                          </button>
                          <span className="text-gray-700">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <Plus className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(cartItem.item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
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
