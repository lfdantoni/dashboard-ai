/**
 * API utility for making HTTP requests to the backend
 */

import { env } from "./env";

// API_BASE_URL only has base url, such as http://localhost:3000, not the full url with the version, such as http://localhost:3000/api/v1
const API_BASE_URL = env.VITE_API_URL || '/api/v1';

export interface ApiError {
  message: string;
  status?: number;
}

/**
 * Make an API request with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  version: string = 'v1',
): Promise<T> {
  // full url with the version, such as http://localhost:3000/api/v1/auth/login
  const url = `${API_BASE_URL}/api/${version}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText || 'An error occurred',
      }));
      
      throw {
        message: errorData.message || 'An error occurred',
        status: response.status,
      } as ApiError;
    }

    return await response.json();
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      throw error;
    }
    throw {
      message: 'Network error or server unavailable',
      status: 0,
    } as ApiError;
  }
}

/**
 * Login with Google ID token
 */
export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
    googleId: string;
  };
}

export interface VerifyResponse {
  authenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
    googleId: string;
  };
}

export const authApi = {
  /**
   * Login with Google ID token
   */
  login: async (idToken: string): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  /**
   * Verify if the current user is authenticated
   */
  verify: async (): Promise<VerifyResponse> => {
    return apiRequest<VerifyResponse>('/auth/verify', {
      method: 'GET',
    });
  },

  /**
   * Logout user and clear authentication cookie
   */
  logout: async (): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  },
};

