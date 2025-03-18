import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Adjust if running on a different port

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enables sending cookies with requests
});

api.interceptors.request.use(
  (config) => {
    console.log('Request Sent:', config);
    return config;
  },
  (error) => Promise.reject(error)
);

export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const registerUser = async (userData) => {
  return await api.post(`${API_BASE_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/login`, userData);
    console.log(response);
    const accessToken = response?.data?.tokens?.access;
    const refreshToken = response?.data?.tokens?.refresh;
    setTokenCookie('accessToken', accessToken, 10);
    setTokenCookie('refreshToken', refreshToken, 20);
  } catch (err) {
    console.log(err);
  }
};

export const getUserDetails = async () => {
  const token = Cookies.get('accessToken');
  return await api.get(`${API_BASE_URL}/auth/whoami`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
};

export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refreshToken');
  if (refreshToken) {
    const response = await api.get(`${API_BASE_URL}/auth/refresh`, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    const newAccessToken = response?.data?.access_token;
    setTokenCookie('accessToken', newAccessToken, 10);
  } else {
    throw new Error('No refresh token');
  }
};

export const logoutUser = async () => {
  const token = Cookies.get('accessToken');
  return await api.get(`${API_BASE_URL}/auth/logout`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const setTokenCookie = (tokenName, token, expiryInSeconds) => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + expiryInSeconds * 1000);
  Cookies.set(tokenName, token, {
    expires: expiryDate,
    secure: false, // set to true in production
    sameSite: 'strict',
  });
  sessionStorage.setItem(`${tokenName}Expiry`, expiryDate.getTime());
};

export default api;
