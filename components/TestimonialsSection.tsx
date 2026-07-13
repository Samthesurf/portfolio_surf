'use client';

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import drAoOjo from "../assets/abuad-engineering/dr-ao-ojo.jpeg";
import anuoluwapoAkinola from "../assets/campus-career/anuoluwapo-akinola.png";

const testimonials = [
  {
    project: "ABUAD Engineering OBE Portal",
    quote: "This website was very good. I showed it to the people from COREN, and they were impressed. They found all they needed, and your speed was incredible. Thank you.",
    name: "Engr. Dr. Adedayo O. Ojo",
    role: "Head of Department, Electrical, Information and Computer Engineering, Afe Babalola University",
    image: drAoOjo,
    imageClassName: "object-contain object-center",
    imageBackdrop: "bg-gradient-to-br from-blue-100 via-slate-100 to-blue-50 dark:from-blue-950 dark:via-slate-900 dark:to-slate-950",
  },
  {
    project: "Campus to Career 2.0",
    quote: "Samuel is really exceptional. When the Campus to Career 2.0 idea came up, we didn't have two names for who would build our website. It just had to be Samuel, and he didn't disappoint. He brought creativity, intelligence, and an astounding attention to detail. He's kind, attentive, and easy to work with. He suggests ideas without imposing them and leaves the customer free to express what they truly want. I have no regrets working with him, and I recommend him to anyone who wants a beautiful, effective, interactive, personalised website.",
    name: "Anuoluwapo Akinola",
    role: "Campus to Career 2.0 Lead",
    image: anuoluwapoAkinola,
    imageClassName: "object-cover object-center",
    imageBackdrop: "bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-950 dark:to-slate-900",
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((current) =>
      (current + newDirection + testimonials.length) % testimonials.length
    );
  };

  const activeTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir < 0 ? 80 : -80,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 transition-colors duration-300 dark:bg-[#030303] md:px-12 lg:px-24">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Client feedback
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            Trusted where the work <span className="text-blue-500 dark:text-blue-400">mattered</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-gray-400">
            Two teams trusted me with work they had to present publicly: an
            accreditation portal used during a COREN review and the event
            platform behind Campus to Career 2.0. These are their words after
            the work was delivered.
          </p>
        </div>

        {/* Testimonial horizontal card spotlight */}
        <figure className="relative bg-slate-50 dark:bg-[#0b1220] border border-slate-200 dark:border-blue-900/30 rounded-[2rem] overflow-hidden shadow-xl dark:shadow-none transition-all duration-300 max-w-5xl mx-auto flex flex-col md:flex-row min-h-[460px]">
          {/* Left panel: Image/Portrait with Curved Divider Motif */}
          <div className={`relative w-full md:w-[38%] h-[340px] md:h-auto overflow-hidden ${activeTestimonial.imageBackdrop}`}>
            {/* Curved divider SVG overlay (motif) */}
            <div className="absolute right-0 top-0 bottom-0 w-12 hidden md:block z-20 pointer-events-none">
              <svg className="h-full w-full fill-slate-50 dark:fill-[#0b1220]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M100,0 Q30,50 100,100 L100,100 Z" />
              </svg>
            </div>

            {/* Blue curved divider/ring motif behind/around the portrait */}
            <div className="absolute -left-8 -top-8 w-36 h-36 rounded-full border-2 border-blue-500/20 dark:border-blue-400/20 pointer-events-none z-10" />
            <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border-[6px] border-blue-500/10 dark:border-blue-400/10 pointer-events-none z-10" />

            {/* Active image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeTestimonial.image}
                  alt={`Portrait of ${activeTestimonial.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={`${activeTestimonial.imageClassName} transition-transform duration-700 hover:scale-105`}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel: Quote content and information */}
          <div className="w-full md:w-[62%] p-8 md:p-10 lg:p-12 flex flex-col justify-between relative">
            {/* Top decorative giant quote icon */}
            <div className="absolute right-8 top-8 select-none text-8xl font-black leading-none text-blue-500/5 dark:text-blue-400/5 pointer-events-none" aria-hidden="true">
              “
            </div>

            <div className="relative">
              {/* Animating the quote & details on click */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                    {activeTestimonial.project}
                  </p>
                  <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-slate-800 dark:text-gray-200">
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </blockquote>

                  <figcaption className="border-t border-slate-200 dark:border-white/10 pt-6">
                    <p className="font-bold text-slate-900 dark:text-white text-lg">
                      {activeTestimonial.name}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400 mt-1">
                      {activeTestimonial.role}
                    </p>
                  </figcaption>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Controls Panel */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/10 mt-8 pt-6">
              {/* Visible progress indicator */}
              <div className="flex items-center gap-1.5 text-sm font-medium" aria-label={`Review ${currentIndex + 1} of ${testimonials.length}`}>
                <span className="text-blue-600 dark:text-blue-400 font-bold text-base">0{currentIndex + 1}</span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="text-slate-500 dark:text-slate-400">0{testimonials.length}</span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => paginate(-1)}
                  className="flex items-center justify-center p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-200 active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="flex items-center justify-center p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-200 active:scale-95"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </figure>
      </div>
    </section>
  );
}
