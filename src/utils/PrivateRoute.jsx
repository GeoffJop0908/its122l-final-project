import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute({ roles = [] }) {
  const { user } = useAuth();

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If roles are defined and user does not have the required role, redirect to unauthorized page
  if (roles.length > 0 && !roles.some((role) => user.labels.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}
