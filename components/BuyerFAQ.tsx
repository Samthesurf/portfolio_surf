const faqItems = [
  {
    question: "What kinds of products can you build?",
    answer:
      "I build cross-platform mobile apps, modern web platforms, backend APIs, internal tools, and AI-powered features. My core stack includes Flutter, React, Next.js, TypeScript, Python, FastAPI, Firebase, Google Gemini, and Cloudflare.",
  },
  {
    question: "Can you help if I only have an idea?",
    answer:
      "Yes. I can help turn an early idea into a practical first release by clarifying the users, core problem, essential features, technical approach, and launch priorities before development begins.",
  },
  {
    question: "How long will my project take?",
    answer:
      "The timeline depends on the product, integrations, and how much is needed for the first release. After a short discovery conversation, I provide a realistic scope, milestone plan, and delivery estimate before development starts.",
  },
  {
    question: "Will I see progress while you build?",
    answer:
      "Yes. I work with clear milestones and share working previews as the product develops, so you can give feedback early and always know what has been completed and what comes next.",
  },
  {
    question: "Can you launch the product for me?",
    answer:
      "Yes. I can handle production deployment for web platforms and backends, and I can prepare and publish Android applications to Google Play. The exact launch and handover responsibilities are agreed in the project scope.",
  },
  {
    question: "Do you work on existing products?",
    answer:
      "Yes. I can improve an existing codebase, add a mobile or AI feature, connect a backend, redesign an important user flow, improve deployment, or take over a product that needs reliable technical direction.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I provide an agreed handover and support period for launch issues, documentation, and operational guidance. Ongoing maintenance or new feature development can also be arranged when the product needs continued support.",
  },
];

export default function BuyerFAQ() {
  return (
    <section className="bg-slate-50 px-6 py-24 transition-colors duration-300 dark:bg-[#050505] md:px-12 lg:px-24">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Before we start
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            Questions clients <span className="text-blue-500 dark:text-blue-400">usually ask</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-gray-400">
            Clear answers about scope, communication, delivery, launch, and support before you commit to a project.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors open:border-blue-500/40 dark:border-white/10 dark:bg-white/5 dark:open:border-blue-400/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-slate-900 marker:content-none dark:text-white md:text-xl">
                {item.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 transition-transform group-open:rotate-45 dark:text-blue-400" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="max-w-3xl pt-4 leading-relaxed text-slate-600 dark:text-gray-400 md:text-lg">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
