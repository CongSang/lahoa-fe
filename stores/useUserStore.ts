import { create } from 'zustand';
import { AuthResponse, User } from '@/types/index';
import Cookies from 'js-cookie';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  login: (auth: AuthResponse) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(persist((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user: user }),
  
  login: (auth) => {
    Cookies.set('access_token', auth.token, { path: '/' });
    Cookies.set('refresh_token', auth.refreshToken, { path: '/' });
  },

  logout: () => {
    set({ user: null })
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });
  },
}), { 
  name: 'user-storage',
  storage: createJSONStorage(() => localStorage),
}));