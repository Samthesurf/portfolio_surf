import Image from "next/image";

import drAoOjo from "../assets/abuad-engineering/dr-ao-ojo.jpeg";
import anuoluwapoAkinola from "../assets/campus-career/anuoluwapo-akinola.png";

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 transition-colors duration-300 dark:bg-[#030303] md:px-12 lg:px-24">
      <div className="container mx-auto max-w-6xl">
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
          <figure className="relative self-start overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-xl shadow-slate-200/40 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-blue-600 before:to-blue-400 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:border-blue-400/20 md:p-9">
            <div className="absolute right-6 top-6 select-none text-7xl font-black leading-none text-blue-500/10 dark:text-blue-400/10" aria-hidden="true">
              “
            </div>
            <div className="relative mb-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                ABUAD Engineering OBE Portal
              </p>
              <blockquote className="text-lg font-medium leading-relaxed text-slate-800 dark:text-gray-200 md:text-xl">
                This website was very good. I showed it to the people from
                COREN, and they were impressed. They found all they needed, and
                your speed was incredible. Thank you.
              </blockquote>
            </div>

            <figcaption className="flex items-center gap-4 border-t border-slate-200 pt-6 dark:border-white/10">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md dark:border-white/20">
                <Image
                  src={drAoOjo}
                  alt="Portrait of Engr. Dr. Adedayo O. Ojo"
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Engr. Dr. Adedayo O. Ojo</p>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                  Head of Programme, Computer Engineering, Afe Babalola University
                </p>
              </div>
            </figcaption>
          </figure>

          <figure className="relative overflow-hidden rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-7 shadow-xl shadow-blue-100/60 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-blue-400 before:via-blue-600 before:to-cyan-400 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-200/50 dark:border-blue-400/20 dark:bg-none dark:bg-blue-500/[0.07] dark:shadow-none dark:hover:border-blue-400/35 md:p-10">
            <div className="absolute right-6 top-6 select-none text-7xl font-black leading-none text-blue-500/10 dark:text-blue-400/10" aria-hidden="true">
              “
            </div>
            <div className="relative mb-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                Campus to Career 2.0
              </p>
              <blockquote className="space-y-4 text-lg font-medium leading-relaxed text-slate-800 dark:text-gray-200 md:text-xl">
                <p>
                  Samuel is really exceptional. I can say that for a fact. When
                  the whole Campus to Career 2.0 idea came up, we didn&apos;t
                  have two names for who would build our website. It just had to
                  be Samuel. I&apos;m telling you! He didn&apos;t disappoint.
                </p>
                <p>
                  He brought creativity, intelligence, and this astounding
                  attention to detail you won&apos;t find in many others. He&apos;s
                  kind, attentive, and easy to work with. He doesn&apos;t impose
                  what he feels is right. He suggests ideas, then leaves the
                  customer free to express what they truly want for the design.
                </p>
                <p>
                  I have no regrets working with him. I&apos;m filled with deep
                  and sincere gratitude for Samuel&apos;s service to the Campus
                  to Career 2.0 team, and I recommend him to anyone who wants a
                  beautiful, effective, interactive, personalised, expressive,
                  you name it, website.
                </p>
              </blockquote>
            </div>

            <figcaption className="flex items-center gap-4 border-t border-blue-200/80 pt-6 dark:border-blue-400/20">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md dark:border-white/20">
                <Image
                  src={anuoluwapoAkinola}
                  alt="Portrait of Anuoluwapo Deborah Akinola"
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Anuoluwapo Deborah Akinola</p>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                  Campus to Career 2.0 Organising Team
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
