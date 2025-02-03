import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../store/cartStore';
import { useAddressStore } from '../store/addressStore';
import { Order } from '../types';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { selectedAddress } = useAddressStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.item.price * item.quantity, 0) + 5; // +5 for delivery fee
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would make an API call to create the order
      const newOrder: Order = {
        id: crypto.randomUUID(),
        items: items,
        total: calculateTotal(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Simulate order placement delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      clearCart();
      localStorage.setItem('order', JSON.stringify(newOrder));
      navigate('/order-details', { state: { order: newOrder } });
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedAddress) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-center text-xl text-gray-600">Please select a delivery address first.</p>
      </div>
    );
  }

  return (
    <div className="mb-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="cashOnDelivery"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              checked={selectedPaymentMethod === 'cashOnDelivery'}
              required
            />
            <label htmlFor="cashOnDelivery">Cash on Delivery</label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="upi"
              name="paymentMethod"
              value="upi"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              checked={selectedPaymentMethod === 'upi'}
              required
            />
            <label htmlFor="upi">UPI</label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="debitCard"
              name="paymentMethod"
              value="debitCard"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              checked={selectedPaymentMethod === 'debitCard'}
              required
            />
            <label htmlFor="debitCard">Debit Card</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
