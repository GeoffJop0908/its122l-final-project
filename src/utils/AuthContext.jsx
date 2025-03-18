import React, { createContext } from 'react';
import { account } from '../appwriteConfig';
import { useContext, useState, useEffect } from 'react';
import { ID } from 'appwrite';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(sessionStorage.getItem('authError') || '');

  useEffect(() => {
    checkUserStatus();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('authError', error);
  }, [error]);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      let accountDetails = await account.get();

      setUser(accountDetails);
      setError('');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const logoutUser = () => {
    account.deleteSession('current');
    setUser(null);
    sessionStorage.removeItem('authError');
  };

  const registerUser = async (userInfo) => {
    setLoading(true);

    try {
      await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );

      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password1
      );

      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (err) {
      if (err.code === 409) {
        setError('Another user has already have this username');
      }
      setError(err.message);
    }

    setLoading(false);
    setError('');
  };

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {}
    setLoading(false);
    setError('');
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    error,
    setError,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
