import React, { createContext, useContext, useState } from 'react';

// Create a Context
const AppContext = createContext();

// Create a Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser ] = useState(null); // Example state: user information
  const [theme, setTheme] = useState('light'); // Example state: theme setting

  const login = (userData) => {
    setUser (userData);
  };

  const logout = () => {
    setUser (null);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ user, login, logout, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  return useContext(AppContext);
};