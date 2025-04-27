// AuthContext.js - Update to use your token naming convention
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Use accessToken instead of token
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken'); // Also clean up refresh token
      setIsAuthenticated(false);
    }
  }, [accessToken]);

  const login = (token, refreshToken) => {
    setAccessToken(token);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  const logout = () => {
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);