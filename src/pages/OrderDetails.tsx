import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Package, CreditCard, Receipt, ChevronRight } from 'lucide-react';
import { Order } from '../types';

interface Checkpoint {
  label: string;
  status: 'complete' | 'pending';
  icon: React.ReactNode;
  description: string;
}

const checkpoints: Checkpoint[] = [
  { 
    label: 'Order Received', 
    status: 'pending',
    icon: <Receipt className="h-5 w-5" />,
    description: 'Your order has been confirmed'
  },
  { 
    label: 'Preparing', 
    status: 'pending',
    icon: <Package className="h-5 w-5" />,
    description: 'Restaurant is preparing your food'
  },
  { 
    label: 'Out for Delivery', 
    status: 'pending',
    icon: <MapPin className="h-5 w-5" />,
    description: 'Order is on the way to you'
  },
  { 
    label: 'Delivered', 
    status: 'pending',
    icon: <CheckCircle className="h-5 w-5" />,
    description: 'Order has been delivered'
  },
];

export default function OrderDetails() {
  const location = useLocation();
  const order: Order | null = location.state?.order;
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);

  useEffect(() => {
    if (order) {
      localStorage.setItem('order', JSON.stringify(order));
    }
  }, [order]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCheckpoint < checkpoints.length - 1 && order?.status !== 'Delivered') {
        setCurrentCheckpoint((prev) => prev + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentCheckpoint, order]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">No Order Found</h2>
          <p className="text-gray-500 mt-2">The order details you're looking for cannot be found.</p>
        </div>
      </div>
    );
  }

  const updateCheckpoints = (orderStatus: string): Checkpoint[] => {
    const updatedCheckpoints = [...checkpoints];
    let index = 0;
    for (const checkpoint of updatedCheckpoints) {
      if (checkpoint.label === orderStatus) {
        checkpoint.status = 'complete';
        break;
      }
      index++;
    }
    return updatedCheckpoints;
  };

  const updatedCheckpoints = updateCheckpoints(order.status);

  const estimatedDeliveryTime = () => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const diff = now.getTime() - orderTime.getTime();
    const minutes = Math.floor((diff / 1000) / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    return `${minutes} minutes`;
  };

  return (
    <div className="mb-10 min-h-screen bg-gray-50">
      <div className="w-full px-0 py-0">
        <div className="bg-white shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Order #{order.id}</h1>
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                {estimatedDeliveryTime()} ago
              </span>
            </div>
            <div className="flex items-center gap-2 text-orange-100">
              <Clock className="h-4 w-4" />
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Order Progress */}
          <div className="px-6 py-8">
            <div className="space-y-8">
              {updatedCheckpoints.map((checkpoint, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                      ${checkpoint.status === 'complete' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'}`}
                    >
                      {checkpoint.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{checkpoint.label}</h3>
                        {checkpoint.status === 'complete' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{checkpoint.description}</p>
                    </div>
                  </div>
                  {index < updatedCheckpoints.length - 1 && (
                    <div className="absolute left-5 top-10 h-full w-[2px] bg-gray-200">
                      <div 
                        className="bg-green-500 h-full transition-all duration-500" 
                        style={{ 
                          height: checkpoint.status === 'complete' ? '100%' : '0%' 
                        }} 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="border-t border-gray-200 px-6 py-8 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Grilled Salmon Bowl</span>
                    <span className="font-medium">$24.99</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Chicken Tikka Masala</span>
                    <span className="font-medium">$18.99</span>
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-semibold text-lg">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-gray-600 text-sm mt-1">123 Main St, Anytown, CA 91234</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Need Help? <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}