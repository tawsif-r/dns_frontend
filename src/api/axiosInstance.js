import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import inside component or setup separately

// --- Configuration ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = 'http://192.168.3.35:8001'; // Your API base URL
const REFRESH_TOKEN_URL = '/auth/api/token/refresh/';
const LOGIN_URL = '/login'; // Your login page route

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

// // --- Response Interceptor ---
// // Handles token expiry and refresh logic
// let isRefreshing = false; // Flag to prevent multiple refresh attempts concurrently
// let failedQueue = []; // Queue to hold requests that failed due to 401

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// apiClient.interceptors.response.use(
//   (response) => {
//     // If the request was successful, just return the response
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is 401 (Unauthorized) and it's not a request to the refresh token endpoint
//     if (error.response?.status === 401 && originalRequest.url !== REFRESH_TOKEN_URL) {

//       // If already refreshing, add the request to the queue and wait
//       if (isRefreshing) {
//         return new Promise(function(resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers['Authorization'] = 'Bearer ' + token;
//           return apiClient(originalRequest); // Retry the original request with new token
//         }).catch(err => {
//           return Promise.reject(err); // Propagate the error if queue processing fails
//         });
//       }

//       // Start the refresh process
//       originalRequest._retry = true; // Mark the request to avoid infinite loops
//       isRefreshing = true;

//       const refreshToken = localStorage.getItem('refreshToken');

//       if (!refreshToken) {
//         console.error("No refresh token found. Redirecting to login.");
//         isRefreshing = false;
//         // Clear tokens just in case
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         // Redirect to login - This needs careful handling outside the interceptor (see point 3)
//         window.location.href = LOGIN_URL; // Force redirect
//         return Promise.reject(error);
//       }

//       try {
//         console.log('Attempting to refresh token...');
//         const refreshResponse = await axios.post(`${API_BASE_URL}${REFRESH_TOKEN_URL}`, {
//           refresh: refreshToken,
//         });

//         const newAccessToken = refreshResponse.data.access;
//         console.log('Token refreshed successfully.');
//         localStorage.setItem('accessToken', newAccessToken);

//         // Update the Authorization header for the original request and the apiClient defaults
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//         processQueue(null, newAccessToken); // Process queued requests with the new token
//         isRefreshing = false;
//         return apiClient(originalRequest); // Retry the original request

//       } catch (refreshError) {
//         console.error('Unable to refresh token:', refreshError);
//         isRefreshing = false;
//         processQueue(refreshError, null); // Reject queued requests

//         // Clear tokens and redirect to login if refresh fails
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         // Redirect to login - This needs careful handling outside the interceptor (see point 3)
//         window.location.href = LOGIN_URL; // Force redirect
//         return Promise.reject(refreshError); // Reject the original request's promise
//       }
//     }

//     // For errors other than 401, just reject the promise
//     return Promise.reject(error);
//   }
// );

export default apiClient;

// --- Important Note on Navigation ---
// Direct navigation (like window.location.href) inside an interceptor isn't ideal
// because interceptors are not React components and don't have access to React Router's context.
// A more robust solution involves context or event emitters, but window.location.href is the simplest.
// See Step 3 for handling redirects more cleanly using Protected Routes.