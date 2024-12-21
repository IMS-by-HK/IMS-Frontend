import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Add state for token
  const [token, setTokenState] = useState(() => {
    return localStorage.getItem('token') || '';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('token', token);
  }, [isAuthenticated, token]);

  const login = () => {
    setIsAuthenticated(true);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setTokenState(''); // Clear the token
  };

  const signup = () => {
    setIsAuthenticated(true);
    setIsLoggedIn(true);
  };

  // Function to set token which updates state and localStorage
  const setToken = (newToken) => {
    setTokenState(newToken);
    localStorage.setItem('token', newToken); // Directly set to localStorage for immediate effect
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoggedIn,
      login,
      logout,
      signup,
      token,
      setToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);