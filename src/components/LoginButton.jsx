import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginButton() {
  return (
    <Link to="/login">
      <span className="btn bg-black text-white border-black shadow-none">
        Log In
      </span>
    </Link>
  );
}
