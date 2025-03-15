import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/login';

const Login = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('One of the inputs are missing!');
    }

    try {
      // const response = await axios.post(REGISTER_URL, {
      //   email: email,
      //   password,
      // });
      // console.log(response.data);
      const response = await axios.post(
        LOGIN_URL,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log(response.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken });

      // Add success logic here
      // navigate('/dashboard');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setError('No Server Response');
      } else if (err.response.status === 400) {
        setError('Incorrect email or password');
      } else if (err.response.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-black">
      <form className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
