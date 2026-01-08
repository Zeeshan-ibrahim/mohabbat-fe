'use client';
import { useState } from "react";
import { Navbar } from "./navbar";
import { z } from "zod";
import { useRegisterUserEmail } from "@/dal/coming-soon/cs.services";

// Move schema outside component to avoid recreation on each render
const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email format" });

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, isPending, isError, error } = useRegisterUserEmail({
    onSuccess: (data) => {
      if (data?.success) {
        setIsSuccess(true);
        setEmail("");
        // Optional: Auto reset after 10 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    // Validate email
    emailSchema.safeParse(email);

    // Submit email
    mutate({ email });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        poster="/bg-image.png"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/coming-soon.mp4" type="video/mp4" />
        <source src="/videos/background.webm" type="video/webm" />
      </video>

      {/* Mobile fallback background */}
      <div className="absolute inset-0 bg-black lg:bg-black/40 -z-10" />

      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Content */}
        <div className="flex flex-col justify-center flex-1 text-white px-6 gap-6 lg:items-start lg:text-left lg:px-0 lg:ml-20 lg:mt-20">
          <img src="/Logo.svg" alt="Logo" className="w-40 lg:w-auto" />

          <h1 className="text-3xl font-libre italic leading-snug lg:text-6xl">
            Dresses Shaped By Forgotten Stories.
          </h1>

          <p className="text-base opacity-90 lg:text-2xl">
            A modern clothing label inspired by ancient narratives.
          </p>

          {/* Success Message */}
          {isSuccess ? (
            <div className="mt-6 w-full max-w-md lg:max-w-xl space-y-4">
              <div className="w-full border border-white/70 py-3 px-4 bg-transparent text-white text-base lg:text-xl">
                We will get back to you with amazing collections
              </div>
            </div>
          ) : (
            /* Email Form */
            <form className="mt-6 w-full max-w-md lg:max-w-xl" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  placeholder="Get notified on release"
                  className="w-full border-b border-white/70 py-3 pr-24 bg-transparent text-white placeholder-white/70 outline-none text-base lg:text-xl disabled:opacity-50"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={isPending}
                />

                <button
                  type="submit"
                  disabled={isPending || !email}
                  className="absolute right-0 bottom-0 px-4 py-2 border border-white text-white text-xs tracking-widest hover:bg-white hover:text-black transition lg:px-6 lg:py-3 lg:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "SENDING..." : "SEND"}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Bottom Illustration */}
        <img
          src="/coming-soon.svg"
          alt=""
          className="w-full max-w-none mx-auto lg:mx-0"
        />
      </div>
    </div>
  );
}