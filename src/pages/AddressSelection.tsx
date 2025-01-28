import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MapPin, Plus, Check, Trash2, Home } from 'lucide-react';
import { useAddressStore, Address } from '../store/addressStore';

export default function AddressSelection() {
  const navigate = useNavigate();
  const { addresses, addAddress, removeAddress, selectAddress, setDefaultAddress } = useAddressStore();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    houseNumber: '',
    street: '',
    landmark: '',
    city: '',
    district: '',
    state: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(formData);
    setIsAddingNew(false);
    setFormData({
      name: '',
      phoneNumber: '',
      houseNumber: '',
      street: '',
      landmark: '',
      city: '',
      district: '',
      state: '',
      pincode: ''
    });
    toast.success('Address added successfully!');
  };

  const handleAddressSelect = (address: Address) => {
    selectAddress(address.id);
    navigate('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Select Delivery Address</h1>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Address</span>
        </button>
      </div>

      {addresses.length > 0 && !isAddingNew && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-lg shadow-md p-6 border-2 border-transparent hover:border-orange-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium text-gray-900">{address.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {address.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Default
                    </span>
                  )}
                  <button
                    onClick={() => removeAddress(address.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{address.phoneNumber}</p>
              <p className="text-gray-600 mb-4">
                {address.houseNumber}, {address.street}
                {address.landmark && `, Near ${address.landmark}`}
                <br />
                {address.city}, {address.district}
                <br />
                {address.state} - {address.pincode}
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleAddressSelect(address)}
                  className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  Deliver Here
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(address.id)}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {(isAddingNew || addresses.length === 0) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {addresses.length === 0 ? 'Add Your First Address' : 'Add New Address'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">
                  House/Flat Number
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  name="houseNumber"
                  required
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street/Area
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                  District
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                  PIN Code
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4">
              {isAddingNew && (
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}