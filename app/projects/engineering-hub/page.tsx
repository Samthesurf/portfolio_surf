import type { Metadata } from "next";
import Link from "next/link";

import HeaderNav from "../../../components/HeaderNav";
import StatsGrid from "../../../components/StatsGrid";
import ProjectScreenshots, {
  type ScreenshotGroup,
} from "../../../components/ProjectScreenshots";
import { SITE } from "../../../lib/site-config";

import engineeringHubDesktop1 from "../../../assets/Engineering-Hub/desktop_view.png";
import engineeringHubDesktop2 from "../../../assets/Engineering-Hub/desktop_view_2.png";
import engineeringHubMobileOnboarding from "../../../assets/Engineering-Hub/photo_2026-01-09_16-51-21.png";
import engineeringHubMobilePerformance from "../../../assets/Engineering-Hub/photo_2026-01-09_16-51-13.png";
import engineeringHubMobileStreaks from "../../../assets/Engineering-Hub/photo_2026-01-09_16-51-17.png";

const GlobeIcon = () => (
  <svg
    className="w-full h-full"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PlayStoreIcon = () => (
  <svg
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4.25 3.35c-.7-.42-1.6.08-1.6.9v15.5c0 .82.9 1.32 1.6.9l15.3-7.75a1 1 0 0 0 0-1.8L4.25 3.35Z" />
    <path d="M3.35 4.15 17.05 14.85" />
    <path d="M3.35 19.85 17.05 9.15" />
  </svg>
);

export const metadata: Metadata = {
  title: "Engineering Hub — AI Learning Platform Case Study",
  description:
    "Case study for Engineering Hub, an AI learning platform for engineering students with course organization, fast PDF delivery, Gemini-generated quizzes, and AI-marked theory answers.",
  alternates: {
    canonical: "/projects/engineering-hub",
  },
  openGraph: {
    type: "article",
    url: `${SITE.url}/projects/engineering-hub`,
    title: "Engineering Hub — AI Learning Platform Case Study",
    description:
      "AI learning platform for engineering students, built around course materials, practice questions, theory feedback, and fast document delivery.",
    images: [SITE.ogImage],
  },
};

const engineeringHubJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/projects/engineering-hub#software`,
      name: "Engineering Hub",
      url: `${SITE.url}/projects/engineering-hub`,
      description:
        "Engineering Hub is an AI learning platform for engineering students. It organizes course materials, delivers large PDFs through Cloudflare R2, and uses Google Gemini to generate quizzes, evaluate theory answers, and provide study feedback.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web, Android",
      author: { "@id": `${SITE.url}/#person` },
      creator: { "@id": `${SITE.url}/#person` },
      publisher: { "@id": `${SITE.url}/#person` },
      screenshot: `${SITE.url}/og-image.png`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      sameAs: "https://engineering-hub-nine.vercel.app",
      keywords: [
        "AI learning platform",
        "engineering education",
        "Flutter app",
        "Firebase",
        "Cloudflare R2",
        "Google Gemini",
        "quiz generation",
        "RAG",
      ].join(", "),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE.url}/projects/engineering-hub#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${SITE.url}/#projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Engineering Hub",
          item: `${SITE.url}/projects/engineering-hub`,
        },
      ],
    },
  ],
};

const highlights = [
  { label: "Platforms", value: "Android, Web (iOS-ready)" },
  { label: "Architecture", value: "Clean Architecture (BLoC/GetX)" },
  { label: "AI Integration", value: "Google Gemini" },
  { label: "Real-time DB", value: "Firebase Firestore" },
  { label: "Edge CDN", value: "Cloudflare R2 + Workers" },
  {
    label: "Core Value",
    value: "Personalized learning & fast document delivery",
  },
];

const screenshotGroups: ScreenshotGroup[] = [
  {
    id: "desktop",
    label: "Desktop / Web",
    previewAspectClass: "aspect-[16/10]",
    thumbAspectClass: "aspect-[16/10]",
    previewMaxWidthClass: "max-w-5xl",
    items: [
      {
        src: engineeringHubDesktop1,
        alt: "Engineering Hub web dashboard (courses overview)",
        imageClassName: "object-cover object-top",
      },
      {
        src: engineeringHubDesktop2,
        alt: "Engineering Hub analytics / insights view",
        imageClassName: "object-cover object-top",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    previewAspectClass: "aspect-[9/19]",
    thumbAspectClass: "aspect-[9/19]",
    previewMaxWidthClass: "max-w-md",
    items: [
      {
        src: engineeringHubMobilePerformance,
        alt: "Engineering Hub mobile performance chart screen",
        imageClassName: "object-cover",
      },
      {
        src: engineeringHubMobileStreaks,
        alt: "Engineering Hub streaks and calendar screen",
        imageClassName: "object-cover",
      },
      {
        src: engineeringHubMobileOnboarding,
        alt: "Engineering Hub onboarding / get started screen",
        imageClassName: "object-cover",
      },
    ],
  },
];

export default function EngineeringHubCaseStudyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] text-slate-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden transition-colors duration-300">
      <HeaderNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(engineeringHubJsonLd),
        }}
      />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* Hero */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
              Case Study
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="text-slate-900 dark:text-white">
                Engineering{" "}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Hub
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              Engineering Hub helps engineering students turn scattered course
              materials into structured study sessions. It combines organized
              course content, fast PDF delivery, Gemini-generated practice
              questions, AI-marked theory answers, and progress tracking in one
              Flutter app.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://engineering-hub-nine.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-transparent bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-gray-100 transition-all active:scale-95"
              >
                <div className="w-5 h-5">
                  <GlobeIcon />
                </div>
                <span>Visit Site</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.engineeringhub.engineeringhub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-transparent bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <PlayStoreIcon />
                <span>Google Play</span>
              </a>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-slate-900/20 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
              >
                Back to Projects
              </Link>
            </div>{" "}
          </div>

          {/* Highlights */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Key{" "}
              <span className="text-blue-500 dark:text-blue-400">
                Highlights
              </span>
            </h2>
            <StatsGrid stats={highlights} />
          </section>

          {/* Screenshots */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Product{" "}
              <span className="text-blue-500 dark:text-blue-400">
                Screenshots
              </span>
            </h2>
            <ProjectScreenshots
              title="Engineering Hub"
              groups={screenshotGroups}
            />
          </section>

          {/* Core Features */}
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Core{" "}
              <span className="text-blue-500 dark:text-blue-400">Features</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold mb-3">
                  AI Study Companion
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>
                    - Generates MCQs, theory questions, and fill-in-the-gap
                    practice from course materials
                  </li>
                  <li>
                    - Marks theory answers with strengths, gaps, and practical
                    improvement suggestions
                  </li>
                  <li>
                    - Supports image-based review for handwritten solutions
                  </li>
                  <li>- Handles LaTeX-heavy math and engineering content</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold mb-3">
                  Course & Content Management
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- Courses grouped by department and academic level</li>
                  <li>- Local caching for faster repeat access and offline use</li>
                  <li>
                    - In-app PDF viewing tuned for textbooks and lecture notes
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold mb-3">
                  Edge-Powered Document Delivery
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>
                    - Cloudflare R2 storage with range requests for large PDFs
                  </li>
                  <li>
                    - Worker proxy and long-lived caching for faster document
                    loads
                  </li>
                  <li>- Browser-safe document access with controlled CORS</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold mb-3">
                  Progress + Study Habits
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- Departmental timetables and study reminders</li>
                  <li>- Streaks and lightweight rewards for consistency</li>
                  <li>- Progress analytics that make improvement visible</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Architecture + Stack */}
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Architecture &{" "}
              <span className="text-blue-500 dark:text-blue-400">Stack</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                <h3 className="text-lg font-bold mb-3">Frontend</h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- Flutter 3.x + Dart</li>
                  <li>- Clean Architecture with BLoC / GetX</li>
                  <li>- Shared codebase for Android and web</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                <h3 className="text-lg font-bold mb-3">AI + Data</h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- Google Gemini for question generation and evaluation</li>
                  <li>- Firestore for user state, progress, and content data</li>
                  <li>- Response handling built around math-heavy output</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                <h3 className="text-lg font-bold mb-3">Edge Delivery</h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- Cloudflare R2 for course documents</li>
                  <li>- Workers proxy with caching and range-request support</li>
                  <li>- Built to keep large learning resources responsive</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20">
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 p-10 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Want something like this built for your users?
              </h2>
              <p className="text-white/90 max-w-2xl">
                If you’re building an AI-enabled product or a high-performance
                app, I can help with architecture, implementation, and shipping.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors"
                >
                  Contact Me
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Back Home
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
