import { create } from 'zustand';
import { Address } from '../types';

interface AddressStore {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  selectAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const loadAddressesFromStorage = (): Address[] => {
  const stored = localStorage.getItem('addresses');
  return stored ? JSON.parse(stored) : [];
};

const saveAddressesToStorage = (addresses: Address[]) => {
  localStorage.setItem('addresses', JSON.stringify(addresses));
};

export const useAddressStore = create<AddressStore>((set) => ({
  addresses: loadAddressesFromStorage(),
  selectedAddress: null,

  addAddress: (address) => {
    set((state) => {
      const newAddress = {
        ...address,
        id: crypto.randomUUID(),
        isDefault: state.addresses.length === 0
      };
      const newAddresses = [...state.addresses, newAddress];
      saveAddressesToStorage(newAddresses);
      return {
        addresses: newAddresses,
        selectedAddress: newAddress
      };
    });
  },

  removeAddress: (id) => {
    set((state) => {
      const newAddresses = state.addresses.filter((a) => a.id !== id);
      saveAddressesToStorage(newAddresses);
      return {
        addresses: newAddresses,
        selectedAddress: state.selectedAddress?.id === id ? null : state.selectedAddress
      };
    });
  },

  updateAddress: (id, updatedFields) => {
    set((state) => {
      const newAddresses = state.addresses.map((address) =>
        address.id === id ? { ...address, ...updatedFields } : address
      );
      saveAddressesToStorage(newAddresses);
      return {
        addresses: newAddresses,
        selectedAddress: state.selectedAddress?.id === id
          ? { ...state.selectedAddress, ...updatedFields }
          : state.selectedAddress
      };
    });
  },

  selectAddress: (id) => {
    set((state) => ({
      selectedAddress: state.addresses.find((a) => a.id === id) || null
    }));
  },

  setDefaultAddress: (id) => {
    set((state) => {
      const newAddresses = state.addresses.map((address) => ({
        ...address,
        isDefault: address.id === id
      }));
      saveAddressesToStorage(newAddresses);
      return { addresses: newAddresses };
    });
  }
}));
