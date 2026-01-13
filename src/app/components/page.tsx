"use client";
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
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        className="absolute w-full h-full object-cover object-bottom lg:object-right lg:object-center -z-10"
      >
        <source src="/videos/coming-soon.mp4" type="video/mp4" media="(min-width: 1024px)" />
        <source
          src="/videos/mob-video.webm"
          type="video/mp4"
          media="(max-width: 1024px)"
        />
      </video>

      {/* Blue gradient overlay from left to right */}
      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#02132c] to-transparent -z-10" />
  
      <div className="flex flex-col h-screen">
        <Navbar />

        {/* Content  */}
        <div className="flex flex-col justify-center flex-1  min-h-0 text-white px-6 gap-4 lg:items-start lg:text-left lg:px-0 lg:ml-20 lg:mt-20">
          <img src="/Logo.svg" alt="Logo" className="w-28" />

          <h1 className="text-2xl font-libre italic leading-snug lg:text-5xl">
            Dresses Shaped By
            <br />
            Forgotten Stories.
          </h1>

          <p className="text-base opacity-90 lg:text-lg">
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
           
            <form
              className="mt-6 w-full max-w-md lg:max-w-xl"
              onSubmit={handleSubmit}
            >
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
                  className="absolute right-0 bottom-0 px-4 py-2 border border-white text-white text-sm tracking-widest hover:bg-white hover:text-black transition lg:py-3 lg:text-sm disabled:cursor-not-allowed"
                >
                  {isPending ? "SENDING..." : "SEND"}
                </button>
              </div>
            </form>
          )}
        </div>

        <img
          src="/coming-soon.svg"
          alt=""
          className="w-full lg:mx-0 flex-shrink-0"
        />
      </div> 
    </div>
  );
}
