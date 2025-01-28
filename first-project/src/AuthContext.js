import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("authToken")?.length>0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [authToken, setAuthToken] = useState(null);

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  const login = (token) => {
    localStorage.setItem("authToken", token); // Save token to localStorage
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
