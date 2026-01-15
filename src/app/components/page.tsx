"use client";
import { useState } from "react";
import { Navbar } from "./navbar";
import { z } from "zod";
import { useRegisterUserEmail } from "@/dal/coming-soon/cs.services";

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

    emailSchema.safeParse(email);
    mutate({ email });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail("");
  };

  return (
    <div className="relative h-dvh lg:h-screen overflow-hidden">
      {/* Background Image */}
      <picture className="absolute inset-0 -z-10 block h-full w-full">
        <source srcSet="/web-bg.png" media="(min-width: 800px)" />
        <img
          src="/mobile-bg.png"
          alt=""
          className="h-full w-full object-cover object-bottom lg:object-center"
        />
      </picture>
      
  
      <div className="flex flex-col h-dvh lg:h-screen">
        {/* <Navbar /> */}

        {/* Content  */}
        <div className="flex flex-col justify-center flex-1  min-h-0 text-white px-6 gap-4 lg:items-start lg:text-left lg:px-0 lg:ml-20 lg:mt-20">
          <img src="/Logo.svg" alt="Logo" className="w-28" />

          <h1 className="lg:text-6xl text-2xl font-libre italic ">
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
                  className="absolute right-0 bottom-0 px-4 py-2 border border-white bg-white/20 text-white text-sm tracking-widest hover:bg-white hover:text-black transition lg:py-3 lg:text-sm disabled:cursor-not-allowed"
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
          className="w-full lg:mx-0 lg:shrink-0"
        />
      </div> 
    </div>
  );
}


{/* <video
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
      </video> */}