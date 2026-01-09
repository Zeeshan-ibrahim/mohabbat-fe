/**
 * Validated environment variables
 * Use these constants throughout your app instead of direct process.env access
 */
export const env = {
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  apiTimeout: process.env.NEXT_PUBLIC_API_TIMEOUT ?? 30000,

  // Application
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Mohabbat",
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0",
  nodeEnv: process.env.NODE_ENV ?? "development",

  // Authentication
  tokenStorageKey: process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY ?? "token",
  sessionTimeout: process.env.NEXT_PUBLIC_SESSION_TIMEOUT ?? 30,
  enableAuth: process.env.NEXT_PUBLIC_ENABLE_AUTH ?? true,

  // Feature Flags
  enableRegistration: process.env.NEXT_PUBLIC_ENABLE_REGISTRATION ?? true,
  enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE ?? true,
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS ?? false,

  // File Upload
  maxFileSize: process.env.NEXT_PUBLIC_MAX_FILE_SIZE ?? 5242880, // 5MB
  allowedFileTypes: process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES ?? "image/jpeg,image/png,image/gif,application/pdf",

  // Pagination
  itemsPerPage: process.env.NEXT_PUBLIC_ITEMS_PER_PAGE ?? 10,
  maxItemsPerPage: process.env.NEXT_PUBLIC_MAX_ITEMS_PER_PAGE ?? 100,

  // UI
  defaultTheme: process.env.NEXT_PUBLIC_DEFAULT_THEME ?? "light" as "light" | "dark" | "system",
  debug: process.env.NEXT_PUBLIC_DEBUG ?? false,

  // Development
  enableReactQueryDevtools: process.env.NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS ?? "development",

  // Check if running in production
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",

  baseURL: process.env.NEXT_PUBLIC_NODE_URL ?? 'http://localhost:3000' 
} as const;

