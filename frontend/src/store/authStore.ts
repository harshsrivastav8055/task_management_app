// frontend/src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authAPI } from '../lib/api';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      login: async (username, password) => {
        try {
          const response = await authAPI.login({ username, password });
          set({
            token: response.access_token,
            isAuthenticated: true,
            // We don't have user data in the login response, so we'd need to fetch it separately
            // For simplicity, we're just setting some basic user data here
            user: {
              id: -1, // This would be replaced with actual data from a user endpoint
              username,
              email: '',
              is_active: true,
            },
          });
          
          localStorage.setItem('token', response.access_token);
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },
      
      signup: async (email, username, password) => {
        try {
          await authAPI.signup({ email, username, password });
          // After signup, we typically login
          const response = await authAPI.login({ username, password });
          
          set({
            token: response.access_token,
            isAuthenticated: true,
            user: {
              id: -1,
              username,
              email,
              is_active: true,
            },
          });
          
          localStorage.setItem('token', response.access_token);
        } catch (error) {
          console.error('Signup failed:', error);
          throw error;
        }
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);