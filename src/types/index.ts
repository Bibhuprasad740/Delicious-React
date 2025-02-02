export interface User {
  id: string;
  email: string;
  name: string;
  address?: string;
  phone?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category: string;
  rating: number;
  calories: number;
  ingredients: string[];
  dietaryType: 'veg' | 'non-veg';
  images: string[];
}

export interface CartItem {
  id: string;
  foodItem: FoodItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'delivered';
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  foodItemId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercentage: number;
  validTill: string;
  terms: string;
  tag: string;
  color: string;
  borderColor: string;
  textColor: string;
  foodItems: FoodItem[];
  applied: boolean;
  appliedAt: string;
  expiresAt: string;
  maxDiscount: number;
  minOrderAmount: number;
}

export interface Checkpoint {
  label: string;
  status: 'complete' | 'pending';
  icon: React.ReactNode;
  description: string;
}
