/**
 * Environment configuration for the Edu-Empower frontend
 * This centralizes all environment variable access
 */

export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // Clerk Authentication
  clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  
  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  
  // Application Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};