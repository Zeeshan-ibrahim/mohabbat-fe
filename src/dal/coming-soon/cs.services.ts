import { env } from "@/lib/env";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";

// Define the payload type
interface RegisterEmailPayload {
  email: string;
}

// Define the response type
interface RegisterEmailResponse {
  message: string;
  success: boolean;
}

// Define a custom error type for better error handling
interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

// Mutation function (extracted for reusability and testing)
const registerEmail = async (
  payload: RegisterEmailPayload
): Promise<RegisterEmailResponse> => {
  const { data } = await axios.post<RegisterEmailResponse>(
    `${env.baseURL}/register-email`,
    payload
  );
  return data;
};

// Custom hook options interface for better flexibility
interface UseRegisterUserEmailOptions {
  onSuccess?: (data: RegisterEmailResponse) => void;
  onError?: (error: AxiosError<ApiError>) => void;
}

export function useRegisterUserEmail(options?: UseRegisterUserEmailOptions) {
  return useMutation({
    mutationFn: registerEmail,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error("Failed to register email:", error);
      options?.onError?.(error);
    },
  });
}