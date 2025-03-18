import React, { createContext, useState, useEffect } from 'react';
import {
  loginUser,
  getUserDetails,
  logoutUser,
  registerUser,
  refreshAccessToken,
} from '../api/axios.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  const login = async (userData) => {
    try {
      await loginUser(userData);
      console.log('Logged in');
      const res = await getUserDetails(); // Fetch user details after login
      console.log(res);
      setUser(res?.data?.user_details);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (userData) => {
    try {
      const res = await registerUser(userData);
      console.log(res);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const refresh = async () => {
    refreshAccessToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        register,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
