import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: string) => Promise<boolean>;
  signup: (name: string, email: string, role: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100', // Female 1
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100', // Male 1
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100', // Female 2
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100', // Male 2
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user session exists in localStorage
    const storedUser = localStorage.getItem('churnsense_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('churnsense_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: string = 'Retention Manager'): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API network request delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple email prefix parsed for nice name, or default values
    const namePart = email.split('@')[0];
    const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[^a-zA-Z0-9]/g, ' ');

    const newUser: UserProfile = {
      name: capitalizedName || 'Demo User',
      email: email,
      role: role,
      avatar: DEMO_AVATARS[Math.abs(email.length) % DEMO_AVATARS.length],
    };

    setUser(newUser);
    localStorage.setItem('churnsense_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (name: string, email: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newUser: UserProfile = {
      name: name,
      email: email,
      role: role,
      avatar: DEMO_AVATARS[Math.abs(email.length + name.length) % DEMO_AVATARS.length],
    };

    setUser(newUser);
    localStorage.setItem('churnsense_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('churnsense_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
