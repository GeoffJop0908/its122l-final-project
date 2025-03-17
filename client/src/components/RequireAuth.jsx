import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAutoLogout from '../hooks/useAutoLogout';

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useAuth();
  useAutoLogout();

  const location = useLocation();

  console.log(user);
  console.log(user?.roles?.find((role) => allowedRoles?.includes(role)));

  return user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.username ? (
    // isLoggedIn ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
