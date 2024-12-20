import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getOneUser } from '../service/service';
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);

      const userId = decodedToken.id;

      if (decodedToken.role === "user") {
        const user = await getOneUser(userId, token);
        console.log(user);
        if (user.user.status === "banned") {
          navigate('/baned');
        } else {
          navigate('/Home');
        }
      } else if (decodedToken.role === "admin") {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="../../src/assets/logo.png"
            className="w-50 h-50 object-contain"
            alt="Logo"
          />
        </div>

        {/* Sign In Form */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none"
            >
              Login
            </button>

          </div>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</a>
        </p>
      </div>
    </div>
  );
};
