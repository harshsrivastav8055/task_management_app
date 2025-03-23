// frontend/src/pages/Signup.tsx
import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import useAuth from '../hooks/useAuth';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const { handleSignup, isSubmitting, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignup(formData);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        
        {error && (
          <div className="bg-destructive/20 text-destructive p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 8 characters
            </p>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-opacity-90 transition disabled:opacity-70"
            >
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;