"use client";

import { type ReactNode } from "react";
import { useAxiosAuth } from "@/hooks/useAxios";

/**
 * Provider component to initialize axios auth interceptors
 * This ensures the auth token interceptor is set up globally
 */
export function AxiosProvider({ children }: { children: ReactNode }) {
  // Initialize axios auth hook to set up interceptors
  useAxiosAuth();

  return <>{children}</>;
}

