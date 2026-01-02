import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, ApiError } from "./auth.types";
import { axiosPublic } from "@/lib/axios";
import { env } from "@/lib/env";

/**
 * Register a new user
 */
export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await axiosPublic.post<RegisterResponse>("/api/auth/register", data);
    return response.data;
  } catch (error: any) {
    const errorData: ApiError = error.response?.data || { message: error.message || "Registration failed" };
    throw new Error(errorData.message || "Registration failed");
  }
}

/**
 * Login user
 */
export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axiosPublic.post<LoginResponse>("/api/auth/login", data);
    const result = response.data;

    // Store auth token if provided
    if (result.token) {
      localStorage.setItem(env.tokenStorageKey, result.token);
    }

    return result;
  } catch (error: any) {
    const errorData: ApiError = error.response?.data || { message: error.message || "Login failed" };
    throw new Error(errorData.message || "Login failed");
  }
}

/**
 * Logout user
 */
export function logoutUser(): void {
  localStorage.removeItem(env.tokenStorageKey);
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(env.tokenStorageKey);
}

/**
 * Get current authenticated user
 * Uses axiosAuth instance which automatically adds Authorization header via interceptors
 */
export async function getCurrentUser(): Promise<{ id: string; email: string; name?: string }> {
  const { axiosAuth } = await import("@/lib/axios");
  
  try {
    const response = await axiosAuth.get<{ id: string; email: string; name?: string }>("/api/auth/me");
    return response.data;
  } catch (error: any) {
    const errorData: ApiError = error.response?.data || { message: error.message || "Failed to fetch user" };
    throw new Error(errorData.message || "Failed to fetch user");
  }
}

