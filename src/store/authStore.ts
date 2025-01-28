import { create } from 'zustand';
import { User } from '../types';
import api from '../lib/axios';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      set({ user: response.data.user });
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/signup', { email, password, name });
      localStorage.setItem('token', response.data.token);
      set({ user: response.data.user });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/auth/me');
      set({ user: response.data });
    } finally {
      set({ isLoading: false });
    }
  },
}));
