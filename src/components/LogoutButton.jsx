import React from 'react';
import { useAuth } from '../utils/AuthContext';

export default function LogoutButton() {
  const { logoutUser } = useAuth();

  return (
    <a
      className="btn btn-outline text-white border-white shadow-none"
      onClick={logoutUser}
    >
      Log Out
    </a>
  );
}
