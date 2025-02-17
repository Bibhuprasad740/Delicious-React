import { create } from 'zustand';
import { CartItem, FoodItem } from '../types';

interface CartStore {
  items: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// Load cart from localStorage on store initialization
const loadCartFromStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

// Save cart to localStorage whenever it changes
const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadCartFromStorage(),

  addToCart: (cartItem: CartItem) => {
    const item = cartItem.foodItem as FoodItem;
    const quantity = cartItem.quantity as number;

    set((state) => {
      const existingItem = state.items.find((i) => i.foodItem.id === item.id);
      let newItems;

      if (existingItem) {
        newItems = state.items.map((i) =>
          i.foodItem.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        
        newItems = [...state.items, cartItem];
      }

      saveCartToStorage(newItems);
      return { items: newItems };
    });
  },

  removeFromCart: (itemId: string) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.foodItem.id !== itemId);
      saveCartToStorage(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (itemId: string, quantity: number) => {
    set((state) => {
      const newItems = state.items.map((i) =>
        i.foodItem.id === itemId ? { ...i, quantity } : i
      );
      saveCartToStorage(newItems);
      return { items: newItems };
    });
  },

  clearCart: () => {
    saveCartToStorage([]);
    set({ items: [] });
  },
}));
