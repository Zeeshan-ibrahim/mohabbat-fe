import axios from "axios";
import { env } from "./env";

/**
 * Axios instance for authenticated requests
 */
export const axiosAuth = axios.create({
  baseURL: env.apiUrl,
  timeout: env.apiTimeout,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Default axios instance for non-authenticated requests
 */
export const axiosPublic = axios.create({
  baseURL: env.apiUrl,
  timeout: env.apiTimeout,
  headers: {
    "Content-Type": "application/json",
  },
});

