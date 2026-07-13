'use client';

import { motion } from 'framer-motion';
import type { ComponentType } from 'react';

// SVG Icons for the Capabilities
const WebIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const MobileIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const BusinessAIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const SaaSIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const LinuxServerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const TrainingIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

interface Capability {
  title: string;
  category: string;
  description: string;
  icon: ComponentType;
  spanClass: string;
}

const capabilities: Capability[] = [
  {
    title: "Websites & Web Platforms",
    category: "Web Engineering",
    description: "Event sites, brand sites, business and company sites, schools, organisations, portals, and custom web experiences, with technical search engine optimisation (SEO) and generative engine optimisation (GEO) built in.",
    icon: WebIcon,
    spanClass: "lg:col-span-2",
  },
  {
    title: "Mobile Applications",
    category: "Mobile",
    description: "Polished cross-platform apps for Android and iOS, including backend, authentication, notifications, data, and launch support.",
    icon: MobileIcon,
    spanClass: "lg:col-span-1",
  },
  {
    title: "WhatsApp AI Agents",
    category: "Conversational AI",
    description: "Conversational assistants for customer support, bookings, onboarding, work updates, document handling, and business operations inside WhatsApp.",
    icon: WhatsAppIcon,
    spanClass: "lg:col-span-1",
  },
  {
    title: "AI Agents for Business",
    category: "Intelligent Automation",
    description: "Custom agents that connect company knowledge, data, tools, and workflows to automate useful work.",
    icon: BusinessAIIcon,
    spanClass: "lg:col-span-2",
  },
  {
    title: "SaaS Product Development",
    category: "Product Development",
    description: "Multi-user web products, dashboards, subscriptions, administration, storage, and production deployment.",
    icon: SaaSIcon,
    spanClass: "lg:col-span-1",
  },
  {
    title: "Linux, Servers & Deployment",
    category: "Infrastructure & Systems",
    description: "Linux servers, Docker, domains, SSL, reverse proxies, cloud services, production deployment, and operational troubleshooting.",
    icon: LinuxServerIcon,
    spanClass: "lg:col-span-1",
  },
  {
    title: "AI Training & Workshops",
    category: "Consulting & Enablement",
    description: "Practical teaching for individuals and teams on AI tools, agents, prompt workflows, and useful automation.",
    icon: TrainingIcon,
    spanClass: "lg:col-span-1",
  },
];

export default function CapabilitiesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section id="capabilities" className="relative px-5 py-20 transition-colors duration-300 bg-white dark:bg-[#030303] sm:px-6 md:px-12 md:py-24 lg:px-24">
      <div className="container mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B132B] via-[#0e1b38] to-[#050b14] border border-blue-500/10 px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:p-20 shadow-2xl">
          {/* Decorative Background Glows */}
          <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

          {/* Section Heading */}
          <div className="relative z-10 max-w-3xl mb-12 md:mb-16">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Services I Offer
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              What I can build for you
            </h2>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              From a public website to an internal AI assistant, I can plan the
              product, build the system, deploy it, and stay with the details
              that make it dependable.
            </p>
          </div>

          {/* Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          >
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={capability.title}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.05] md:p-8 ${capability.spanClass}`}
                >
                  {/* Subtle hover gradient overlay */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Card Content */}
                  <div className="flex h-full flex-col gap-5">
                    <div>
                      {/* Icon & Category */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors duration-300">
                          <Icon />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-300 transition-colors duration-300">
                          {capability.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                        {capability.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-base text-slate-300 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Call To Action */}
          <div className="relative z-10 mt-12 border-t border-white/10 pt-10 text-center md:mt-16 md:pt-12">
            <p className="text-slate-300 text-lg mb-6">
              Not sure which category your idea fits into? That is fine. Start
              with the problem you want to solve.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/30 hover:scale-105 active:scale-95 group"
            >
              <span>Discuss your project</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
