import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
// import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { user, refresh, setUser } = useAuth();
  const effectRan = useRef(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        refresh();
      } catch (err) {
        setUser(null);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // if (!effectRan.current) {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      verifyRefreshToken();
    } else {
      setUser(null);
      setIsLoading(false);
    }
    effectRan.current = true;
    // }

    // !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
