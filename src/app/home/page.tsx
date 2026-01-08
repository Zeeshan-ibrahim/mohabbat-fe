import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <div className="">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-8 px-8 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full items-center justify-between">
          <Image className="w-10 h-10 rounded-full"
            src="/logo.jpg"
            alt="Next.js logo"
            width={100}
            height={100}
            priority
          />
          {/* TODO : collection and aticles link */}
          <ThemeToggle />
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground dark:text-zinc-50">
            Welcome to Mohabbat
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Create your account to get started and join our community.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/register"
          >
            Register
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-zinc-300 px-5 transition-colors hover:border-transparent hover:bg-zinc-100 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="/login"
          >
            Sign In
          </a>
        </div>
      </main>
    </div>
  );
}
