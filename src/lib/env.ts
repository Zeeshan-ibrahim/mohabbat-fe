/**
 * Environment variable utilities
 * Provides type-safe access to environment variables with validation
 */

/**
 * Get environment variable with optional default value
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value) {
    if (defaultValue) return defaultValue;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue || "";
}

/**
 * Get boolean environment variable
 */
export function getEnvBoolean(key: string, defaultValue = false): boolean {
  const value = process.env[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === "true" || value === "1";
}

/**
 * Get number environment variable
 */
export function getEnvNumber(key: string, defaultValue?: number): number {
  const value = process.env[key];
  if (!value) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  const num = parseInt(value, 10);
  if (isNaN(num)) {
    throw new Error(`Invalid number for environment variable ${key}: ${value}`);
  }
  return num;
}

/**
 * Validated environment variables
 * Use these constants throughout your app instead of direct process.env access
 */
export const env = {
  // API Configuration
  apiUrl: getEnv("NEXT_PUBLIC_API_URL", "http://localhost:3000/api"),
  apiTimeout: getEnvNumber("NEXT_PUBLIC_API_TIMEOUT", 30000),

  // Application
  appName: getEnv("NEXT_PUBLIC_APP_NAME", "Mohabbat"),
  appEnv: getEnv("NEXT_PUBLIC_APP_ENV", "development"),
  appVersion: getEnv("NEXT_PUBLIC_APP_VERSION", "1.0.0"),
  nodeEnv: getEnv("NODE_ENV", "development"),

  // Authentication
  tokenStorageKey: getEnv("NEXT_PUBLIC_TOKEN_STORAGE_KEY", "token"),
  sessionTimeout: getEnvNumber("NEXT_PUBLIC_SESSION_TIMEOUT", 30),
  enableAuth: getEnvBoolean("NEXT_PUBLIC_ENABLE_AUTH", true),

  // Feature Flags
  enableRegistration: getEnvBoolean("NEXT_PUBLIC_ENABLE_REGISTRATION", true),
  enableDarkMode: getEnvBoolean("NEXT_PUBLIC_ENABLE_DARK_MODE", true),
  enableAnalytics: getEnvBoolean("NEXT_PUBLIC_ENABLE_ANALYTICS", false),

  // Third-Party Services
  // gaId: getEnv("NEXT_PUBLIC_GA_ID", ""),
  // stripePublishableKey: getEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", ""),

  // File Upload
  maxFileSize: getEnvNumber("NEXT_PUBLIC_MAX_FILE_SIZE", 5242880), // 5MB
  allowedFileTypes: getEnv(
    "NEXT_PUBLIC_ALLOWED_FILE_TYPES",
    "image/jpeg,image/png,image/gif,application/pdf"
  ).split(","),

  // Pagination
  itemsPerPage: getEnvNumber("NEXT_PUBLIC_ITEMS_PER_PAGE", 10),
  maxItemsPerPage: getEnvNumber("NEXT_PUBLIC_MAX_ITEMS_PER_PAGE", 100),

  // UI
  defaultTheme: getEnv("NEXT_PUBLIC_DEFAULT_THEME", "light") as "light" | "dark" | "system",
  debug: getEnvBoolean("NEXT_PUBLIC_DEBUG", false),

  // Development
  enableReactQueryDevtools: getEnvBoolean(
    "NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS",
    process.env.NODE_ENV === "development"
  ),

  // Check if running in production
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
} as const;

