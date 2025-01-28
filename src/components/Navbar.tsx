import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Home, Menu, Gift } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const cartItems = useCartStore((state) => state.items);

  const handleTabChange = (path: string) => {
    setActiveTab(path);
  };

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
      <ul className="flex justify-around items-center h-16">
        {/* Home Tab */}
        <li className={`w-1/4 text-center ${activeTab === '/' ? 'text-orange-500' : 'text-gray-400'}`}>
          <Link to="/">
            <button
              className="w-full h-full flex flex-col items-center justify-center text-sm"
              onClick={() => handleTabChange('/')}
            >
              <Home className="w-6 h-6" />
              <span>Home</span>
            </button>
          </Link>
        </li>

        {/* Menu Tab */}
        <li className={`w-1/4 text-center ${activeTab === '/menu' ? 'text-orange-500' : 'text-gray-400'}`}>
          <Link to="/menu">
            <button
              className="w-full h-full flex flex-col items-center justify-center text-sm"
              onClick={() => handleTabChange('/menu')}
            >
              <Menu className="w-6 h-6" />
              <span>Menu</span>
            </button>
          </Link>
        </li>

        {/* Offers Tab */}
        <li className={`w-1/4 text-center ${activeTab === '/offers' ? 'text-orange-500' : 'text-gray-400'}`}>
          <Link to="/offers">
            <button
              className="w-full h-full flex flex-col items-center justify-center text-sm"
              onClick={() => handleTabChange('/offers')}
            >
              <Gift className="w-6 h-6" />
              <span>Offers</span>
            </button>
          </Link>
        </li>

        {/* Cart Tab */}
        <li className={`w-1/4 text-center ${activeTab === '/cart' ? 'text-orange-500' : 'text-gray-400'}`}>
          <Link to="/cart">
            <button
              className="w-full h-full flex flex-col items-center justify-center text-sm"
              onClick={() => handleTabChange('/cart')}
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Cart</span>
            </button>
          </Link>
        </li>

        {/* Profile Tab */}
        <li className={`w-1/4 text-center ${activeTab === '/profile' ? 'text-orange-500' : 'text-gray-400'}`}>
          <Link to="/profile">
            <button
              className="w-full h-full flex flex-col items-center justify-center text-sm"
              onClick={() => handleTabChange('/profile')}
            >
              <User className="w-6 h-6" />
              <span>Profile</span>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
