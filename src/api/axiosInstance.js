import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import inside component or setup separately

// --- Configuration ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- Axios Instance ---
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
// Adds the access token to the Authorization header before sending requests
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default apiClient;
