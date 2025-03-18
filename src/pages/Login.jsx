import { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, loginUser, error, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userInfo = { email, password };

    if (!email.trim() || !password.trim()) {
      setError('One of the inputs are missing!');
    } else {
      loginUser(userInfo);
    }
  };

  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      className="flex items-center justify-center pb-28 h-[85vh] text-black"
    >
      <form className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer mt-5"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </motion.div>
  );
};

export default Login;
