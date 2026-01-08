import { Navbar } from "./navbar";

export const ComingSoonPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Video (optional on mobile) */}
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
        <div
          className="
            flex flex-col items-center justify-center flex-1
            text-white px-6 text-center gap-6
            lg:items-start lg:text-left lg:px-0
            lg:ml-20 lg:mt-20
          "
        >
          <img src="/Logo.svg" alt="Logo" className="w-40 lg:w-auto" />

          <h1
            className="
              text-3xl font-libre italic leading-snug
              lg:text-6xl
            "
          >
            Dresses Shaped By Forgotten Stories.
          </h1>

          <p
            className="
              text-base opacity-90
              lg:text-2xl
            "
          >
            A modern clothing label inspired by ancient narratives
          </p>

          {/* Email Input */}
          <div className="mt-6 relative w-full max-w-md lg:max-w-xl">
            <input
              type="email"
              placeholder="Get notified on release"
              className="
                w-full border-b border-white/70
                py-3 pr-24 bg-transparent
                text-white placeholder-white/70
                outline-none text-base
                lg:text-xl
              "
            />

            <button
              className="
                absolute right-0 bottom-0 px-4 py-2
                border border-white text-white
                text-xs tracking-widest
                hover:bg-white hover:text-black transition
                lg:px-6 lg:py-3 lg:text-sm
              "
            >
              SEND
            </button>
          </div>
        </div>

        {/* Bottom Illustration */}
        <img
          src="/coming-soon.svg"
          alt=""
          className="w-full max-w-xs mx-auto mb-6 lg:max-w-none lg:mx-0"
        />
      </div>
    </div>
  );
};
