import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // This is a mock login - replace with your actual API call
      if (email && password) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUser = {
          id: '1',
          name: 'Sarah Anderson',
          email: email,
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        };
        
        setUser(mockUser);
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'mock-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Please provide email and password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      // This is a mock signup - replace with your actual API call
      if (name && email && password) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUser = {
          id: '1',
          name: name,
          email: email,
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        };
        
        setUser(mockUser);
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'mock-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Please provide all required fields');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }, []);

  // Check for existing session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    signup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 