import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const { user, registerUser, error, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    setError('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email.trim() ||
      !name.trim() ||
      !password1.trim() ||
      !password2.trim()
    ) {
      setError('One of the inputs are missing!');
    } else if (password1 !== password2) {
      setError('Passwords do not match.');
    } else {
      registerUser({ name, email, password1, password2 });
    }
  };

  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.75, type: 'spring' }}
      className="flex items-center justify-center h-[90vh] text-black"
    >
      <form className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer mt-5"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
    </motion.div>
  );
}
