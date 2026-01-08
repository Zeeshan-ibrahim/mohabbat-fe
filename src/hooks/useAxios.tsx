"use client";

import { useEffect, useRef } from "react";
import { axiosAuth } from "@/lib/axios";
import { getAuthToken, logoutUser } from "@/dal/auth/auth.service";

/**
 * Hook to get axios instance with auth token interceptor
 * Automatically adds Authorization header from localStorage token
 */
export const useAxiosAuth = () => {
  const interceptorsSetup = useRef(false);

  useEffect(() => {
    if (interceptorsSetup.current) return;

    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        const token = getAuthToken();
        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        
        // Handle 401 Unauthorized - clear token and redirect
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          
          // Clear invalid token
          logoutUser();
          
          // Redirect to login if not already there
          if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
            window.location.href = "/login";
          }
        }
        
        return Promise.reject(error);
      }
    );

    interceptorsSetup.current = true;

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
      interceptorsSetup.current = false;
    };
  }, []);

  return axiosAuth;
};

export default useAxiosAuth;
