import Image from "next/image";
import AnimatedText from "../components/AnimatedText";
import HeaderNav from "../components/HeaderNav";
import HeroVisual from "../components/HeroVisual";
import SkillsSection from "../components/SkillsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden">
      {/* Navigation Bar */}
      <HeaderNav />

      {/* Hero Section */}
      <main className="relative flex min-h-[calc(100vh-100px)] items-start justify-center pt-32">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Text Content */}
            <div className="max-w-3xl">
              {/* Hi there - PRESERVED STYLING */}
              <div className="mb-6">
                <AnimatedText
                  text="Hi there,"
                  className="font-rubik-wet-paint text-2xl md:text-4xl font-medium text-blue-400 tracking-wide drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  staggerDuration={0.05}
                />
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-4">
                <span className="text-white">I am </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                  Samuel Ukpai
                </span>,
                <br />
                <span className="text-gray-500 font-medium text-3xl md:text-5xl lg:text-6xl mt-2 block">
                  Full Stack Software Developer.
                </span>
              </h1>
              <p className="text-blue-400 text-lg md:text-xl font-medium mb-8">
                Mobile Applications • Backend Development • AI Integrations
              </p>

              <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
                Crafting exceptional digital experiences with precision and passion.
                Specializing in high-performance mobile applications.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-5">
                <a href="#projects" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                  See my work
                  <div className="absolute inset-0 -z-10 bg-white blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                </a>

                <button className="px-8 py-4 rounded-full border border-white/10 text-white font-semibold text-lg hover:bg-white/5 hover:border-white/30 transition-all active:scale-95 backdrop-blur-sm flex items-center gap-2 group">
                  Contact me
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual */}
            <div className="hidden lg:block h-full min-h-[500px]">
              <HeroVisual />
            </div>

          </div>
        </div>
      </main>

      {/* Skills/Services Section */}
      <SkillsSection />
    </div>
  );
}
