import Image from "next/image";

import drAoOjo from "../assets/abuad-engineering/dr-ao-ojo.jpeg";

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
            The ABUAD Engineering OBE portal supported the department during its successful COREN accreditation review by making essential programme information clear and easy to access.
          </p>
        </div>

        <figure className="relative rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-white/5 dark:shadow-none md:p-10">
          <div className="absolute right-6 top-4 select-none text-7xl font-black leading-none text-blue-500/15 dark:text-blue-400/15" aria-hidden="true">
            “
          </div>
          <blockquote className="relative max-w-4xl text-xl font-medium leading-relaxed text-slate-800 dark:text-gray-200 md:text-2xl">
            “This website was very good. I showed it to the people from COREN, and they were impressed. They found all they needed, and your speed was incredible. Thank you.”
          </blockquote>

          <figcaption className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6 dark:border-white/10">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md dark:border-white/20">
              <Image
                src={drAoOjo}
                alt="Dr A.O. Ojo"
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
      </div>
    </section>
  );
}
