import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
// import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  // const refresh = useRefreshToken();

  const refresh = () => {};
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!auth?.accessToken) return config;

        const tokenData = JSON.parse(atob(auth.accessToken.split('.')[1]));
        const expiration = tokenData.exp * 1000; // Convert to ms
        const now = Date.now();

        if (expiration < now) {
          try {
            const newToken = refresh();
            config.headers['Authorization'] = `Bearer ${newToken}`;
          } catch (err) {
            setAuth({});
            localStorage.removeItem('auth');
            window.location.href = '/login';
          }
        } else {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }

        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, setAuth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
