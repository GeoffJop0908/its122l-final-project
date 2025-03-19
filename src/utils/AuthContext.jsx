import React, { createContext } from 'react';
import { account, functions } from '../appwrite/config.js';
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
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setError('');
  };

  const listUsers = async () => {
    try {
      const response = await functions.createExecution(
        import.meta.env.VITE_FUNCTION_ID,
        undefined, // Data
        false, // Async execution (false if you want to wait for response)
        '/users', // Path
        'GET', // Method
        undefined // Headers
      );

      return JSON.parse(response.responseBody); // Return parsed response
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  };

  const updateUserLabels = async (userId, labels) => {
    try {
      const response = await functions.createExecution(
        import.meta.env.VITE_FUNCTION_ID, // Function ID
        JSON.stringify({ userId, labels }), // Data
        false, // Synchronous execution
        `/users/${userId}/labels`, // Path
        'PUT', // Method
        { 'Content-Type': 'application/json' } // Headers
      );

      return JSON.parse(response.responseBody);
    } catch (error) {
      console.error('Error updating user labels:', error);
      return null;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await functions.createExecution(
        import.meta.env.VITE_FUNCTION_ID,
        undefined, // No extra data needed
        false, // Synchronous execution
        `/users/${userId}`, // API path
        'DELETE', // HTTP method
        { 'Content-Type': 'application/json' } // Headers
      );
      console.log(response);
      return JSON.parse(response.responseBody);
    } catch (error) {
      console.error('Error deleting user:', error);
      return null;
    }
  };

  const updateUserName = async (userId, name) => {
    try {
      const response = await functions.createExecution(
        import.meta.env.VITE_FUNCTION_ID,
        JSON.stringify({ name }), // Data
        false, // Synchronous execution
        `/users/${userId}/name`, // Path
        'PATCH', // Method
        { 'Content-Type': 'application/json' } // Headers
      );

      return JSON.parse(response.responseBody);
    } catch (error) {
      console.error('Error updating user name:', error);
      return null;
    }
  };

  const updateUserPhone = async (userId, phone) => {
    try {
      const response = await functions.createExecution(
        import.meta.env.VITE_FUNCTION_ID,
        JSON.stringify({ phone }),
        false,
        `/users/${userId}/phone`,
        'PATCH',
        { 'Content-Type': 'application/json' }
      );

      return JSON.parse(response.responseBody);
    } catch (error) {
      console.error('Error updating user phone:', error);
      return null;
    }
  };

  const updateUserEmail = async (userId, email) => {
    try {
      const response = await functions.createExecution(
        import.meta.env.VITE_FUNCTION_ID,
        JSON.stringify({ email }),
        false,
        `/users/${userId}/email`,
        'PATCH',
        { 'Content-Type': 'application/json' }
      );

      return JSON.parse(response.responseBody);
    } catch (error) {
      console.error('Error updating user email:', error);
      return null;
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    error,
    setError,
    listUsers,
    updateUserLabels,
    deleteUser,
    updateUserName,
    updateUserPhone,
    updateUserEmail,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
