import React from 'react';
import { Order } from '../types';

const dummyOrders: Order[] = [
  {
    id: 'order1',
    items: [],
    total: 25.99,
    status: 'Delivered',
    createdAt: '2024-10-26T10:00:00Z',
  },
  {
    id: 'order2',
    items: [],
    total: 15.50,
    status: 'Preparing',
    createdAt: '2024-10-26T12:30:00Z',
  },
  {
    id: 'order3',
    items: [],
    total: 30.00,
    status: 'Placed',
    createdAt: '2024-10-27T09:15:00Z',
  },
];

export default function MyOrders() {
  return (
    <div className="mb-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {dummyOrders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {dummyOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg font-medium text-gray-900 mb-2">Order ID: {order.id}</p>
              <p className="text-gray-600 mb-2">Placed: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-gray-600 mb-2">Total: ${order.total.toFixed(2)}</p>
              <p className="text-gray-600">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
