import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        console.log("Token loaded from SecureStore:", token);
        setIsAuthenticated(true);
      }
    };
    loadToken();
  }, []);

  const login = async (token: string) => {
    setIsAuthenticated(true);
    await SecureStore.setItemAsync('userToken', token);
    console.log("Token saved to SecureStore:", token);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await SecureStore.deleteItemAsync('userToken');
    console.log("Token removed from SecureStore");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};