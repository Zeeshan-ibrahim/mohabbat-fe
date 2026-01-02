# Environment Variables Guide

This document explains all environment variables used in the Mohabbat frontend application.

## Table of Contents

- [Overview](#overview)
- [Required Variables](#required-variables)
- [Optional Variables](#optional-variables)
- [Server-Side Variables](#server-side-variables)
- [Setup Instructions](#setup-instructions)
- [Security Notes](#security-notes)

## Overview

Environment variables are configuration values that change between different environments (development, staging, production). In Next.js:

- **`NEXT_PUBLIC_*`** variables are exposed to the browser (client-side)
- Variables without `NEXT_PUBLIC_` prefix are only available on the server

## Required Variables

### `NEXT_PUBLIC_API_URL`
- **Type**: String
- **Required**: Yes
- **Description**: Base URL for your backend API
- **Example**: `http://localhost:3000/api` (development) or `https://api.yourdomain.com` (production)
- **Usage**: Used in `src/lib/axios.ts` for all API requests

## Optional Variables

### API Configuration

#### `NEXT_PUBLIC_API_TIMEOUT`
- **Type**: Number (milliseconds)
- **Default**: 30000 (30 seconds)
- **Description**: Request timeout for API calls
- **Usage**: Can be used to configure axios timeout

### Application Configuration

#### `NODE_ENV`
- **Type**: String
- **Values**: `development`, `staging`, `production`
- **Default**: Set automatically by Next.js
- **Description**: Environment mode

#### `NEXT_PUBLIC_APP_ENV`
- **Type**: String
- **Description**: Application environment identifier
- **Usage**: Can be used for conditional logic in the app

#### `NEXT_PUBLIC_APP_NAME`
- **Type**: String
- **Default**: "Mohabbat"
- **Description**: Application name
- **Usage**: Can be used in page titles, headers, etc.

#### `NEXT_PUBLIC_APP_VERSION`
- **Type**: String
- **Description**: Application version number
- **Usage**: Can be displayed in footer or about page

### Authentication & Security

#### `NEXT_PUBLIC_TOKEN_STORAGE_KEY`
- **Type**: String
- **Default**: "token"
- **Description**: LocalStorage key name for storing auth token
- **Usage**: Used in `auth.service.ts` for token management

#### `NEXT_PUBLIC_SESSION_TIMEOUT`
- **Type**: Number (minutes)
- **Description**: Session timeout duration
- **Usage**: Can be used to implement auto-logout

#### `NEXT_PUBLIC_ENABLE_AUTH`
- **Type**: Boolean (string: "true" or "false")
- **Default**: "true"
- **Description**: Enable/disable authentication features
- **Usage**: Feature flag for auth system

### Feature Flags

#### `NEXT_PUBLIC_ENABLE_REGISTRATION`
- **Type**: Boolean (string)
- **Default**: "true"
- **Description**: Enable/disable user registration
- **Usage**: Can hide registration buttons/links

#### `NEXT_PUBLIC_ENABLE_DARK_MODE`
- **Type**: Boolean (string)
- **Default**: "true"
- **Description**: Enable/disable dark mode toggle
- **Usage**: Can hide theme toggle component

#### `NEXT_PUBLIC_ENABLE_ANALYTICS`
- **Type**: Boolean (string)
- **Default**: "false"
- **Description**: Enable/disable analytics tracking
- **Usage**: Can conditionally load analytics scripts

### Third-Party Services

#### `NEXT_PUBLIC_GA_ID`
- **Type**: String
- **Description**: Google Analytics tracking ID
- **Usage**: For analytics tracking

#### `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- **Type**: String
- **Description**: Google OAuth client ID (if implementing Google login)
- **Usage**: For Google Sign-In integration

#### `NEXT_PUBLIC_FACEBOOK_APP_ID`
- **Type**: String
- **Description**: Facebook App ID (if implementing Facebook login)
- **Usage**: For Facebook Sign-In integration

#### `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Type**: String
- **Description**: Stripe publishable key (if implementing payments)
- **Usage**: For Stripe payment integration

#### `NEXT_PUBLIC_SENTRY_DSN`
- **Type**: String
- **Description**: Sentry DSN for error tracking
- **Usage**: For error monitoring and tracking

### File Upload Configuration

#### `NEXT_PUBLIC_MAX_FILE_SIZE`
- **Type**: Number (bytes)
- **Default**: 5242880 (5MB)
- **Description**: Maximum file upload size
- **Usage**: For file upload validation

#### `NEXT_PUBLIC_ALLOWED_FILE_TYPES`
- **Type**: String (comma-separated)
- **Description**: Allowed MIME types for file uploads
- **Example**: `image/jpeg,image/png,application/pdf`
- **Usage**: For file type validation

### Pagination & Limits

#### `NEXT_PUBLIC_ITEMS_PER_PAGE`
- **Type**: Number
- **Default**: 10
- **Description**: Default number of items per page
- **Usage**: For pagination components

#### `NEXT_PUBLIC_MAX_ITEMS_PER_PAGE`
- **Type**: Number
- **Default**: 100
- **Description**: Maximum items per page
- **Usage**: For pagination limits

### UI Configuration

#### `NEXT_PUBLIC_DEFAULT_THEME`
- **Type**: String
- **Values**: `light`, `dark`, `system`
- **Default**: `light`
- **Description**: Default theme for the application
- **Usage**: For theme provider initialization

#### `NEXT_PUBLIC_DEBUG`
- **Type**: Boolean (string)
- **Default**: "false"
- **Description**: Enable debug mode (shows console logs, etc.)
- **Usage**: For development debugging

### Development Tools

#### `NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS`
- **Type**: Boolean (string)
- **Default**: "true" (in development)
- **Description**: Enable React Query DevTools
- **Usage**: For development debugging

## Server-Side Variables

These variables are **only available on the server** (API routes, server components, etc.) and should **never** be prefixed with `NEXT_PUBLIC_`.

### Database Configuration
- `DATABASE_URL` - Database connection string

### JWT & Security
- `JWT_SECRET` - Secret key for JWT token verification
- `JWT_EXPIRES_IN` - JWT token expiration time

### API Keys
- `SERVER_API_KEY` - API key for server-side operations

### Email Configuration
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password

## Setup Instructions

1. **Copy the example file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** with your actual values

3. **For production**, set environment variables in your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Docker: Use `docker-compose.yml` or `.env` file

4. **Restart your development server** after changing environment variables:
   ```bash
   npm run dev
   ```

## Security Notes

### ⚠️ Important Security Guidelines

1. **Never commit `.env.local` or `.env` files** to version control
   - Already added to `.gitignore`

2. **Never use `NEXT_PUBLIC_` prefix for sensitive data**
   - Secrets, API keys, passwords should never be exposed to the browser
   - Only use `NEXT_PUBLIC_` for values that are safe to expose

3. **Server-side variables are safer**
   - Variables without `NEXT_PUBLIC_` are only available on the server
   - Use these for database connections, secrets, etc.

4. **Environment-specific values**
   - Use different values for development, staging, and production
   - Never use production credentials in development

5. **Validate environment variables**
   - Consider using a library like `zod` to validate env vars at startup
   - Fail fast if required variables are missing

## Example Usage in Code

```typescript
// Client-side (browser)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiTimeout = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000");

// Server-side only (API routes, server components)
const jwtSecret = process.env.JWT_SECRET; // Only available on server
const dbUrl = process.env.DATABASE_URL; // Only available on server
```

## Next Steps

1. Create `.env.local` file with your actual values
2. Update `src/lib/axios.ts` if you need to use `NEXT_PUBLIC_API_TIMEOUT`
3. Add validation for required environment variables at app startup
4. Document any additional environment variables as you add features

