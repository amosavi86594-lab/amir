import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginAsDemoUser: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => void;
  hasAccessToProduct: (productId: string) => boolean;
  addPurchasedProducts: (productIds: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('noorplaner_user');
      return saved
        ? JSON.parse(saved)
        : {
            id: 'usr-demo-01',
            fullName: 'آرش شایان',
            email: 'arash@example.ir',
            phone: '۰۹۱۲۳۴۵۶۷۸۹',
            role: 'customer',
            purchasedProductIds: ['np-prog-01'], // Pre-owned program for instant testing
            savedPlans: ['np-diet-02'],
          };
    } catch {
      return {
        id: 'usr-demo-01',
        fullName: 'آرش شایان',
        email: 'arash@example.ir',
        phone: '۰۹۱۲۳۴۵۶۷۸۹',
        role: 'customer',
        purchasedProductIds: ['np-prog-01'],
        savedPlans: ['np-diet-02'],
      };
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('noorplaner_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('noorplaner_user');
      }
    } catch {
      // storage quota
    }
  }, [user]);

  const loginAsDemoUser = () => {
    setUser({
      id: 'usr-demo-01',
      fullName: 'آرش شایان',
      email: 'arash@example.ir',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      role: 'customer',
      purchasedProductIds: ['np-prog-01'],
      savedPlans: ['np-diet-02'],
    });
  };

  const loginAsDemoAdmin = () => {
    setUser({
      id: 'usr-admin-01',
      fullName: 'مدیریت ارشد نورپلنر',
      email: 'admin@noorplaner.com',
      phone: '۰۹۱۲۰۰۰۰۰۰۰',
      role: 'admin',
      purchasedProductIds: ['np-prog-01', 'np-diet-02', 'np-rec-05', 'np-book-06'],
      savedPlans: [],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const hasAccessToProduct = (productId: string) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.purchasedProductIds.includes(productId);
  };

  const addPurchasedProducts = (productIds: string[]) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return null;
      const combined = Array.from(new Set([...prev.purchasedProductIds, ...productIds]));
      return { ...prev, purchasedProductIds: combined };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAsDemoUser,
        loginAsDemoAdmin,
        logout,
        hasAccessToProduct,
        addPurchasedProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
