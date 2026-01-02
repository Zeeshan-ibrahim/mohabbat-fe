// Auth API calls - Data Access Layer

export interface RegisterRequest {
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    address?: string | null;
  }
  
  export interface RegisterResponse {
    message?: string;
    user?: {
      id: string;
      email: string;
      name?: string;
    };
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token?: string;
    user?: {
      id: string;
      email: string;
      name?: string;
    };
    message?: string;
  }
  
  export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
  }