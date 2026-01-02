import { Navbar } from "./navbar";

export const ComingSoonPage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/background.webm" type="video/webm" />
      </video>

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Page Content */}
      <div className="flex flex-col h-full">
        <Navbar />

        <div className="flex flex-col items-start justify-center flex-1 text-white w-200 mt-65 ml-20">
            <h1 className="text-6xl font-libre italic">Dresses Shaped By Forgotten Stories.</h1>
            <p className="mt-3 text-2xl">A modern clothing label inspired by ancient narratives.</p>
            

            <div className="mt-10 relative w-full max-w-xl">
                <input
                    type="email"
                    placeholder="Get notified on release"
                    className="w-full border-b border-white/70 
                    py-3 pr-24 text-white placeholder-white/70 outline-none text-xl"
                />

                <button
                    className="absolute right-0 bottom-0 px-6 py-3 border border-white text-white
                    text-sm tracking-widest hover:bg-white hover:text-black transition"
                >
                    SEND
                </button>
            </div>

        </div>

        <h1 className="text-[380px] transperent text-[#FFFFFF4D] whitespace-nowrap translate-y-[6%]">Coming Soon</h1>
      </div>
      
     
    </div>
  );
};
