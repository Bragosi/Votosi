/**
 * Axios HTTP client configured for the Votosi backend.
 * Handles JWT token storage via expo-secure-store since
 * HTTP-only cookies don't work well in React Native.
 */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@/constants/Api';

const TOKEN_KEY = 'votosi_jwt';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token from secure store
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: extract & store token from Set-Cookie if present
apiClient.interceptors.response.use(
  async (response) => {
    // The backend sends the JWT in the response cookie.
    // In React Native, we need to extract it from response headers or body.
    // Since we can't reliably get httpOnly cookies in RN, the token
    // will be passed back in the response data or we handle it via
    // cookie header parsing.
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      const jwtCookie = Array.isArray(setCookie)
        ? setCookie.find((c) => c.startsWith('jwt='))
        : setCookie.startsWith('jwt=')
          ? setCookie
          : undefined;

      if (jwtCookie) {
        const token = jwtCookie.split('jwt=')[1]?.split(';')[0];
        if (token) {
          await SecureStore.setItemAsync(TOKEN_KEY, token);
        }
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — will be handled by auth store
      SecureStore.deleteItemAsync(TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

export { apiClient, TOKEN_KEY };
