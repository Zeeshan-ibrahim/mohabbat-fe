"use client";

import { useMutation } from "@tanstack/react-query";
import {
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  type RegisterResponse,
} from "@/dal/auth/auth.types";
import { loginUser, registerUser } from "@/dal/auth/auth.service";
import { useRouter } from "next/navigation";

/**
 * Hook for user registration
 */
export function useRegister() {
  const router = useRouter();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push("/login");
    },
  });
}

/**
 * Hook for user login
 */
export function useLogin() {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push("/");
    },
  });
}

