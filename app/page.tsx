import Image from "next/image";
import AnimatedText from "../components/AnimatedText";
import HeaderNav from "../components/HeaderNav";
import HeroVisual from "../components/HeroVisual";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import BlogSection from "../components/BlogSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] text-slate-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden transition-colors duration-300">
      {/* Navigation Bar */}
      <HeaderNav />

      {/* Hero Section */}
      <main className="relative flex min-h-[calc(100vh-100px)] items-start justify-center pt-32">
        {/* Background Gradients removed */}

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Text Content */}
            <div className="max-w-3xl">
              {/* Hi there - PRESERVED STYLING */}
              <div className="mb-6">
                <AnimatedText
                  text="Hi there,"
                  className="font-rubik-wet-paint text-2xl md:text-4xl font-medium text-blue-500 dark:text-blue-400 tracking-wide"
                  staggerDuration={0.05}
                />
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-4">
                <span className="text-slate-900 dark:text-white">I am </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-slate-600 dark:via-gray-200 to-slate-400 dark:to-gray-400">
                  Samuel Ukpai
                </span>,
                <br />
                <span className="text-slate-500 dark:text-gray-500 font-medium text-3xl md:text-5xl lg:text-6xl mt-2 block">
                  Full Stack Software Developer.
                </span>
              </h1>
              <p className="text-blue-500 dark:text-blue-400 text-lg md:text-xl font-medium mb-8">
                Mobile Applications • Backend Development • AI Integrations
              </p>

              <p className="text-slate-500 dark:text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
                Crafting exceptional digital experiences with precision and passion.
                Specializing in high-performance mobile applications.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-5">
                <a href="#projects" className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  See my work
                </a>

                <a href="#contact" className="px-8 py-4 rounded-full border border-slate-900 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-lg hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-900 dark:hover:border-white/30 transition-all active:scale-95 backdrop-blur-sm flex items-center gap-2 group">
                  Contact me
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
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
      <ProjectsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
