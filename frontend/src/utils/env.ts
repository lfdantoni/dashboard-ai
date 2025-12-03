/**
 * Environment variables utility
 * Provides access to runtime-injected VITE_* environment variables
 * Falls back to build-time variables for development
 */

interface RuntimeEnv {
  [key: string]: string | undefined;
}

declare global {
  interface Window {
    __ENV__?: RuntimeEnv;
  }
}

/**
 * Get an environment variable value
 * Priority: runtime config (window.__ENV__) > build-time (import.meta.env)
 */
export function getEnvVar(key: string): string | undefined {
  // Try runtime config first (production/Docker)
  if (typeof window !== 'undefined' && window.__ENV__?.[key]) {
    return window.__ENV__[key];
  }
  
  // Fallback to build-time env (development)
  return import.meta.env[key as keyof ImportMetaEnv] as string | undefined;
}

/**
 * Get all VITE_* environment variables
 */
export function getAllEnvVars(): RuntimeEnv {
  const runtime = typeof window !== 'undefined' ? window.__ENV__ : {};
  const buildTime = import.meta.env;
  
  // Merge runtime and build-time, with runtime taking priority
  const all: RuntimeEnv = {};
  
  // Add all build-time VITE_ vars
  for (const key in buildTime) {
    if (key.startsWith('VITE_')) {
      all[key] = buildTime[key as keyof ImportMetaEnv] as string;
    }
  }
  
  // Override with runtime vars
  if (runtime) {
    Object.assign(all, runtime);
  }
  
  return all;
}

/**
 * Type-safe getter for specific env vars
 */
export const env = {
  get VITE_GOOGLE_CLIENT_ID() {
    return getEnvVar('VITE_GOOGLE_CLIENT_ID');
  },
  // Add more getters as needed
  // get VITE_API_URL() {
  //   return getEnvVar('VITE_API_URL');
  // },
};

