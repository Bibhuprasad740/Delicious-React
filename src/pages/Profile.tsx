import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Package, CreditCard, Settings, Bell, Lock, Phone, Mail } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleMyOrdersClick = () => {
    navigate('/my-orders');
  };

  const handleDarkThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('darkTheme', isDarkTheme ? 'false' : 'true'); // Persist theme preference
    document.body.classList.toggle('dark'); // Apply dark theme class
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'orders', label: 'Orders' },
    { id: 'payments', label: 'Payments' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="mb-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-orange-100 p-4 rounded-full">
              <User className="h-12 w-12 text-orange-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-gray-500">Member since January 2024</p>
            </div>
            <button 
              onClick={() => navigate('/settings')}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Dark Theme Toggle Button */}
        <button onClick={handleDarkThemeToggle} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
          {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        </button>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mr-2 py-4 px-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>john.doe@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Account Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-gray-500" />
                      <span>Notification preferences</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-gray-500" />
                      <span>Privacy settings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {['Home', 'Work'].map((type) => (
                  <div key={type} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">{type} Address</h3>
                        <span className="text-sm text-gray-500">
                          {type === 'Home' ? 'Primary' : 'Secondary'}
                        </span>
                      </div>
                      <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>{type === 'Home' ? '123 Main Street' : '456 Business Ave'}</p>
                      <p>{type === 'Home' ? 'Apt 4B' : 'Floor 12'}</p>
                      <p>New York, NY {type === 'Home' ? '10001' : '10002'}</p>
                      <p>United States</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Recent Orders</h3>
                  <button
                    onClick={handleMyOrdersClick}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    View All Orders
                  </button>
                </div>
                <div className="border rounded-lg divide-y">
                  {[1, 2, 3].map((order) => (
                    <div key={order} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Package className="h-8 w-8 text-orange-600" />
                        <div>
                          <p className="font-medium">Order #{order}23456</p>
                          <p className="text-sm text-gray-500">Placed on Jan {order + 10}, 2024</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                        Track Order
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Payment Methods</h3>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Add New Card
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-orange-600" />
                        <div>
                          <p className="font-medium">•••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6">
              <div className="space-y-6">
                <h3 className="font-medium">Account Settings</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Email Notifications',
                      description: 'Receive updates about your orders',
                      action: 'Configure'
                    },
                    {
                      title: 'Password',
                      description: 'Last changed 3 months ago',
                      action: 'Change'
                    },
                    {
                      title: 'Two-Factor Authentication',
                      description: 'Add an extra layer of security',
                      action: 'Enable'
                    }
                  ].map((setting, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{setting.title}</p>
                        <p className="text-sm text-gray-500">{setting.description}</p>
                      </div>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                        {setting.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}