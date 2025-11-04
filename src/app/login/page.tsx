"use client";

import { useState } from "react";
import { z } from "zod";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLogin } from "@/dal/auth/useAuth";

// Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate with Zod
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    loginMutation.mutate(
      {
        email: result.data.email,
        password: result.data.password,
      },
      {
        onError: (error) => {
          setErrors({
            submit: error.message || "An error occurred. Please try again.",
          });
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 dark:bg-black sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground dark:text-zinc-50">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground dark:text-zinc-300">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-foreground placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-700 dark:focus:border-zinc-500 ${
                  errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-zinc-300"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground dark:text-zinc-300">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border px-3 py-2 text-foreground placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-700 dark:focus:border-zinc-500 ${
                  errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-zinc-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-200">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="group relative flex w-full justify-center rounded-md bg-foreground px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-[#383838] focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#ccc] dark:hover:text-black"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Don't have an account? </span>
            <a
              href="/register"
              className="font-medium text-zinc-950 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
