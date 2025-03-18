import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAuth from './useAuth';

const useAutoLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const expiryTime = sessionStorage.getItem('refreshTokenExpiry');
    if (expiryTime) {
      const currentTime = Date.now();
      const timeUntilExpiry = expiryTime - currentTime;

      if (timeUntilExpiry > 0) {
        const timeoutId = setTimeout(() => {
          if (!Cookies.get('authToken')) {
            setUser(null);
            navigate('/login');
          }
        }, timeUntilExpiry);

        return () => clearTimeout(timeoutId);
      } else {
        // Token has already expired
        setUser(null);
        navigate('/login');
      }
    }
  }, []);
};

export default useAutoLogout;
