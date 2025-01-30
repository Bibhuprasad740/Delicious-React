import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import CartDisplay from './components/CartDisplay';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import MealDetails from './pages/MealDetails';
import AddressSelection from './pages/AddressSelection';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import MyOrders from './pages/MyOrders';
import Menu from './pages/Menu';
import CategoryPage from './pages/CategoryPage';
import Offers from './pages/Offers';
import BirthdaySpecial from './pages/BirthdaySpecial';
import CategoryDetails from './pages/CategoryDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col h-full">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/meal/:foodItemId" element={<MealDetails />} />
              <Route path="/address-selection" element={<AddressSelection />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-details" element={<OrderDetails />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/category/:categoryId" element={<CategoryPage />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/offers/birthday-special" element={<BirthdaySpecial />} />
              <Route path="/category/:categoryId" element={<CategoryDetails />} />
            </Routes>
          </div>
          <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
            <ul className="flex justify-around items-center h-12">
              {/* Navigation links */}
            </ul>
          </nav>
        </div>
        <Toaster position="top-right" />
      </div>
      <CartDisplay />
    </Router>
  );
}

export default App;
