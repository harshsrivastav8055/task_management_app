// frontend/src/hooks/useAuth.ts
import { useAuthStore } from '../store/authStore';
import { useNavigate } from '@tanstack/react-router';

export const useAuth = () => {
  const { user, isAuthenticated, login, signup, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogin = async (username: string, password: string) => {
    await login(username, password);
    navigate({ to: '/dashboard' });
  };
  
  const handleSignup = async (email: string, username: string, password: string) => {
    await signup(email, username, password);
    navigate({ to: '/dashboard' });
  };
  
  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };
  
  return {
    user,
    isAuthenticated,
    handleLogin,
    handleSignup,
    handleLogout,
  };
};