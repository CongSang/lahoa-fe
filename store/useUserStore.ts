import { create } from 'zustand';
import { AuthResponse, User } from '@/types/index';
import Cookies from 'js-cookie';
import { getAccountInfoApi } from '@/services/index';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  login: (auth: AuthResponse) => void;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set, get) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user: user }),

  fetchCurrentUser: async () => {
    const token = Cookies.get('access_token');

    if (!token) {
      set({ user: null, isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await getAccountInfoApi(); 
      set({ user: response, isLoading: false });
    } catch (error) {
      console.error("Fetch user info fail:", error);
      set({ user: null, isLoading: false });
    }
  },
  
  login: (auth) => {
    set({ user: auth.user });
    Cookies.set('access_token', auth.token, { path: '/' });
    Cookies.set('refresh_token', auth.refreshToken, { path: '/' });
  },

  logout: () => {
    set({ user: null })
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });

    window.location.href = "/"
  },
}), { 
  name: 'user-storage',
  storage: createJSONStorage(() => localStorage),
}));