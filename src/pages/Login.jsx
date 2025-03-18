import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const refresh = useRefreshToken();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('One of the inputs are missing!');
    }

    try {
      await login({ username, password });

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
      } else if (err.response.status === 500) {
        setError('Email does not exist.');
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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
