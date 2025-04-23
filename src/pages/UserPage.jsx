import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosInstance';

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/login');
        return;
      }

      try {
        const response = await apiClient.get(`/auth/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login');
        } else {
          setError('Failed to fetch user data. Please try again.');
        }
        console.error('User data fetch error:', err);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="border-2 border-gray-700 rounded-lg p-8 m-4 max-w-md w-full bg-gray-800">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">User Profile</h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        {userData ? (
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Username</label>
              <p className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600">{userData.username}</p>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <p className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600">{userData.email || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Subscription Status</label>
              <p className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-gray-600">
                {userData.subscription_status || 'N/A'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full p-3 bg-red-600 text-white font-semibold rounded-md border-2 border-red-500 hover:bg-red-700 transition-colors"
            >
              Log Out
            </button>
          </div>
        ) : !error && (
          <p className="text-gray-400 text-center">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;