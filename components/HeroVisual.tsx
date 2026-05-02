"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ModulePosition = {
  top: string;
  left: string;
};

type SideModule = {
  id: string;
  src: string;
  label: string;
  caption: string;
  position: ModulePosition;
  delay: number;
  floatDelay: number;
};

const sideModules: SideModule[] = [
  {
    id: "mobile",
    src: "/hero/architecture-flow/mobile-app.svg",
    label: "Mobile Apps",
    caption: "Flutter & native flows",
    position: { top: "21%", left: "17.4%" },
    delay: 0.55,
    floatDelay: 0,
  },
  {
    id: "web",
    src: "/hero/architecture-flow/web-app.svg",
    label: "Web Apps",
    caption: "React, Next.js, Tailwind",
    position: { top: "79%", left: "17.4%" },
    delay: 0.75,
    floatDelay: 1.2,
  },
  {
    id: "ai",
    src: "/hero/architecture-flow/ai-orchestration.svg",
    label: "AI Workflows",
    caption: "LLM orchestration & agents",
    position: { top: "21%", left: "82.6%" },
    delay: 0.9,
    floatDelay: 0.6,
  },
  {
    id: "data",
    src: "/hero/architecture-flow/data-cloud.svg",
    label: "Data & Cloud",
    caption: "Storage, sync, infrastructure",
    position: { top: "79%", left: "82.6%" },
    delay: 1.05,
    floatDelay: 1.8,
  },
];

export default function HeroVisual() {
  return (
    <div
      className="relative h-full w-full min-h-[500px] flex items-center justify-center"
      role="img"
      aria-label="System architecture diagram with mobile, web, AI workflow, and data cloud modules orbiting a central API service"
    >
      <div className="relative w-full max-w-[640px] aspect-[920/620]">
        {/* Soft ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[16%] rounded-full bg-blue-500/15 blur-3xl opacity-70 dark:bg-blue-500/25 dark:opacity-90"
        />

        {/* Connector layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <Image
            src="/hero/architecture-flow/flow-connectors.svg"
            alt=""
            fill
            priority
            className="object-contain opacity-80 dark:opacity-95"
            sizes="640px"
          />
        </motion.div>

        {/* Side module cards */}
        {sideModules.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: m.delay }}
            className="absolute w-[24%] -translate-x-1/2 -translate-y-1/2"
            style={m.position}
          >
            <motion.div className="rounded-2xl border border-slate-200/80 bg-white/75 p-2.5 shadow-lg shadow-blue-500/5 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/20">
              <div className="relative aspect-[320/220] w-full overflow-hidden rounded-xl bg-slate-900 dark:bg-[#0A1020]">
                <Image
                  src={m.src}
                  alt={m.label}
                  fill
                  className="object-contain p-1"
                  sizes="160px"
                />
              </div>
              <div className="mt-2 px-0.5">
                <p className="text-[11px] font-semibold tracking-wide text-slate-900 dark:text-white">
                  {m.label}
                </p>
                <p className="text-[10px] leading-tight text-slate-500 dark:text-gray-400">
                  {m.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Center API card - emphasized */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
          className="absolute top-1/2 left-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div className="relative">
            {/* Pulse ring */}
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -inset-3 rounded-[26px] border border-blue-400/50"
            />

            <div className="relative rounded-2xl border border-blue-500/40 bg-white/85 p-3 shadow-[0_0_50px_rgba(59,130,246,0.18)] backdrop-blur-xl dark:border-blue-400/40 dark:bg-white/[0.05] dark:shadow-[0_0_50px_rgba(59,130,246,0.25)]">
              <div className="relative aspect-[320/220] w-full overflow-hidden rounded-xl bg-slate-900 dark:bg-[#0A1020]">
                <Image
                  src="/hero/architecture-flow/api-core.svg"
                  alt="API and backend service hub"
                  fill
                  className="object-contain p-1"
                  sizes="200px"
                />
              </div>
              <div className="mt-2 flex items-center justify-between px-0.5">
                <div>
                  <p className="text-[12px] font-semibold tracking-wide text-slate-900 dark:text-white">
                    API &amp; Backend
                  </p>
                  <p className="text-[10px] leading-tight text-slate-500 dark:text-gray-400">
                    Service hub &amp; orchestration
                  </p>
                </div>
                <motion.span
                  aria-hidden="true"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="block h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
