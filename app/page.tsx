import AnimatedText from "../components/AnimatedText";
import HeaderNav from "../components/HeaderNav";
import HeroVisual from "../components/HeroVisual";
import CapabilitiesSection from "../components/CapabilitiesSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
import BuyerFAQ from "../components/BuyerFAQ";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] text-slate-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden transition-colors duration-300">
      {/* Navigation Bar */}
      <HeaderNav />

      {/* Hero Section */}
      <main className="relative flex min-h-[calc(100vh-88px)] items-center justify-center pt-28 pb-20 sm:pt-32 lg:min-h-[calc(100vh-100px)] lg:items-start lg:pb-0">
        {/* Background Gradients removed */}

        <div className="container mx-auto px-5 sm:px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-2 lg:gap-12 items-center">

            {/* Left Column: Text Content */}
            <div className="order-last max-w-3xl lg:order-first">
              {/* Outcome-led introduction */}
              <div className="mb-3 sm:mb-6">
                <AnimatedText
                  text="From idea to launch,"
                  className="font-rubik-wet-paint text-2xl sm:text-3xl md:text-4xl font-medium text-blue-500 dark:text-blue-400 tracking-wide"
                  staggerDuration={0.05}
                />
              </div>

              {/* Main Heading */}
              <h1 className="text-[clamp(2.45rem,11vw,4.5rem)] md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-2 sm:mb-4">
                <span className="text-slate-900 dark:text-white">I turn ideas into </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-slate-600 dark:via-gray-200 to-slate-400 dark:to-gray-400">
                  reliable digital products
                </span>.
                <br />
                <span className="text-slate-500 dark:text-gray-500 font-medium text-[clamp(1.55rem,7vw,3.5rem)] md:text-5xl lg:text-6xl mt-2 block">
                  Useful, polished, and ready to launch.
                </span>
              </h1>
              <p className="text-blue-500 dark:text-blue-400 text-base sm:text-lg md:text-xl font-medium mb-2">
                Samuel Ukpai • Full Stack Software Developer
              </p>
              <p className="text-slate-500 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-lg mb-6 sm:mb-10 leading-relaxed">
                I help founders, organisations, and teams plan, build, and launch useful
                mobile apps, web platforms, backends, and AI-powered experiences.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5">
                <a href="#projects" className="w-full rounded-full bg-slate-900 px-6 py-3 text-center text-base font-bold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-colors hover:bg-slate-700 sm:w-auto sm:px-8 sm:py-4 sm:text-lg dark:bg-white dark:text-black dark:shadow-[0_0_10px_rgba(255,255,255,0.2)] dark:hover:bg-gray-200">
                  Explore delivered products
                </a>

                <a href="#contact" className="group flex w-full items-center justify-center gap-2 rounded-full border border-slate-900 px-6 py-3 text-base font-semibold text-slate-900 backdrop-blur-sm transition-all hover:border-slate-900 hover:bg-slate-100 active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-lg dark:border-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/5">
                  Discuss your project
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual */}
            <div className="order-first flex h-[180px] min-h-[180px] items-center justify-center sm:h-[240px] sm:min-h-[240px] md:h-[320px] md:min-h-[320px] lg:order-last lg:block lg:h-full lg:min-h-[500px]">
              <HeroVisual />
            </div>

          </div>
        </div>
      </main>

      {/* Capabilities Section */}
      <CapabilitiesSection />

      {/* Skills/Services Section */}
      <SkillsSection />
      <ProjectsSection />
      <TestimonialsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Buyer FAQ */}
      <BuyerFAQ />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
