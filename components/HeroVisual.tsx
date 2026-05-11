"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <div
      className="relative h-full w-full min-h-[500px] flex items-center justify-center"
      role="img"
      aria-label="Portrait of Samuel Ukpai"
    >
      <div className="relative w-full max-w-[640px] aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200/60 shadow-2xl shadow-blue-500/10 dark:border-white/10 dark:shadow-blue-500/20">
        {/* Portrait Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/hero/samuel-portrait.jpg"
            alt="Samuel Ukpai"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </motion.div>

        {/* Bottom gradient for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Text Overlay — Bottom Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="absolute bottom-6 left-6 md:bottom-8 md:left-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Samuel Ukpai
          </h2>
          <p className="mt-1 text-lg md:text-xl font-semibold tracking-wide text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Hacker
          </p>
        </motion.div>

        {/* Subtle ambient glow ring */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none"
        />
      </div>
    </div>
  );
}
