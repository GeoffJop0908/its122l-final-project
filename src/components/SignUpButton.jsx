import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUpButton() {
  return (
    <Link to="/register">
      <span className="btn bg-white text-black border-black shadow-none">
        Sign Up
      </span>
    </Link>
  );
}
