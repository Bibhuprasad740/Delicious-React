import { create } from 'zustand';
import { FoodItem } from '../types';

interface CartItem {
  item: FoodItem;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: FoodItem, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

interface CartItem {
  item: FoodItem;
  quantity: number;
  isBirthdaySpecial?: boolean;
  addons?: {
    cutlery: boolean;
    softDrinks: number;
  };
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

  addToCart: (item: FoodItem, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.item.id === item.id);
      let newItems;

      if (existingItem) {
        newItems = state.items.map((i) =>
          i.item.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        newItems = [...state.items, { item, quantity }];
      }

      saveCartToStorage(newItems);
      return { items: newItems };
    });
  },

  removeFromCart: (itemId: string) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.item.id !== itemId);
      saveCartToStorage(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (itemId: string, quantity: number) => {
    set((state) => {
      const newItems = state.items.map((i) =>
        i.item.id === itemId ? { ...i, quantity } : i
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
