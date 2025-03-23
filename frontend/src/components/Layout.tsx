// frontend/src/components/Layout.tsx
import React from 'react';
import { Link, Outlet } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

const Layout: React.FC = () => {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="text-xl font-bold text-primary">Task Manager</Link>
          
          <nav className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-primary">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-white shadow-inner py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Task Manager App
        </div>
      </footer>
    </div>
  );
};

export default Layout;