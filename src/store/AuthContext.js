import React, { useState, createContext, useMemo } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const isLoggedIn = !!token;

  const login = (tkn) => {
    console.log("hi");
    localStorage.setItem('token', tkn);
    setToken(tkn);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const memoedValue = useMemo(
    () => ({
      token,
      isLoggedIn,
      login,
      logout,
    }),
    [token, isLoggedIn],
  );

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
}

export default AuthContext;