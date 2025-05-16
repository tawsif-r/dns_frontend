import React, { useState } from 'react';
// import axios from 'axios'; // Remove this
import apiClient from '../api/axiosInstance'; // Import your instance
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, SetUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Use apiClient instead of axios
      const response = await apiClient.post('/auth/api/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data;
      console.log(access, refresh)
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      navigate('/');
    } catch (err) {
      if (err.response?.status === 401) {
        // Interceptor handles refresh, but login specific 401 means invalid creds
        setError('Invalid username or password');
      } else if (err.message.includes('Network Error')) {
        setError('Network Error: Could not connect to the server.');
      }
      else {
        setError('An error occurred during login. Please try again.');
      }
      console.error('Login error:', err);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="border-2 border-gray-700 rounded-lg p-8 m-4 max-w-md w-full bg-gray-800">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-gray-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-gray-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit" // Use type="submit" for form submission
            className="w-full p-3 bg-gray-600 text-white font-semibold rounded-md border-2 border-gray-500 hover:bg-gray-500 transition-colors"
          >
            Sign In
          </button>
        </form>
        {/* ... rest of JSX ... */}
      </div>
    </div>
  );
}

export default LoginPage;