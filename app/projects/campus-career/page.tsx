import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import HeaderNav from "../../../components/HeaderNav";
import StatsGrid from "../../../components/StatsGrid";
import ProjectScreenshots, {
  type ScreenshotGroup,
} from "../../../components/ProjectScreenshots";
import { SITE } from "../../../lib/site-config";

import campusDesktopHero from "../../../assets/campus-career/campus-desktop-hero.png";
import campusDesktopActivities from "../../../assets/campus-career/campus-desktop-activities.png";
import campusMobileHero from "../../../assets/campus-career/campus-mobile-hero.png";
import campusMobileActivities from "../../../assets/campus-career/campus-mobile-activities.png";
import campusMobileHighlights from "../../../assets/campus-career/campus-mobile-highlights.png";
import campusOg from "../../../assets/campus-career/campus-og.png";

export const runtime = "edge";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

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

export const metadata: Metadata = {
  title: "Campus to Career — Client Event Platform Case Study",
  description:
    "Case study for the Campus to Career 2.0 event platform I built for a student career conference in Nigeria, with event discovery, brand trust, and ticket purchase flow.",
  alternates: {
    canonical: "/projects/campus-career",
  },
  openGraph: {
    type: "article",
    url: `${SITE.url}/projects/campus-career`,
    title: "Campus to Career — Client Event Platform Case Study",
    description:
      "Client event platform built for Campus to Career 2.0, helping students understand the conference and buy tickets with ease.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Campus to Career — Client Project Case Study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus to Career — Client Project Case Study",
    description:
      "Case study for the Campus to Career event platform, built for a student career conference in Nigeria.",
    images: ["/og-image.png"],
  },
};

const highlights = [
  { label: "Role", value: "Client project · Full-stack developer" },
  { label: "Live at", value: "campustocareer.ng" },
  { label: "Audience", value: "1,000+ student attendees" },
  { label: "Focus", value: "Clarity, trust, and ticket purchase" },
  { label: "Organizer tools", value: "Simple view of traffic and interest" },
  { label: "Built with", value: "React + Cloudflare" },
];

const screenshotGroups: ScreenshotGroup[] = [
  {
    id: "desktop",
    label: "Desktop / Web",
    previewAspectClass: "aspect-[16/9]",
    thumbAspectClass: "aspect-[16/9]",
    previewMaxWidthClass: "max-w-5xl",
    items: [
      {
        src: campusDesktopHero,
        alt: "Campus to Career desktop hero with event date and venue",
        imageClassName: "object-cover object-top",
      },
      {
        src: campusDesktopActivities,
        alt: "Campus to Career activities and program section",
        imageClassName: "object-cover object-top",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile layout",
    previewAspectClass: "aspect-[9/16]",
    thumbAspectClass: "aspect-[9/16]",
    previewMaxWidthClass: "max-w-sm",
    items: [
      {
        src: campusMobileHero,
        alt: "Campus to Career mobile hero with date and venue",
        imageClassName: "object-cover object-top",
      },
      {
        src: campusMobileActivities,
        alt: "Campus to Career mobile activities section",
        imageClassName: "object-cover object-top",
      },
      {
        src: campusMobileHighlights,
        alt: "Campus to Career mobile highlights gallery",
        imageClassName: "object-cover object-top",
      },
    ],
  },
  {
    id: "og",
    label: "OG / Social card",
    previewAspectClass: "aspect-[1200/630]",
    thumbAspectClass: "aspect-[1200/630]",
    previewMaxWidthClass: "max-w-3xl",
    items: [
      {
        src: campusOg,
        alt: "Campus to Career branded social share card",
        imageClassName: "object-cover",
      },
    ],
  },
];

const campusJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/projects/campus-career#website`,
      url: "https://campustocareer.ng",
      name: "Campus to Career 2.0",
      description:
        "Public event platform for Campus to Career 2.0, a career-prep conference for university students in Nigeria. Built and deployed by Samuel Ukpai.",
      inLanguage: "en",
      creator: { "@id": `${SITE.url}/#person` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/projects/campus-career#software`,
      name: "Campus to Career",
      alternateName: "Campus to Career 2.0",
      url: `${SITE.url}/projects/campus-career`,
      sameAs: "https://campustocareer.ng",
      description:
        "Client event platform built for Campus to Career 2.0, a student career conference in Nigeria. It helps attendees understand the event, trust the program, and move smoothly toward buying tickets.",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "EventManagementApplication",
      operatingSystem: "Web",
      author: { "@id": `${SITE.url}/#person` },
      creator: { "@id": `${SITE.url}/#person` },
      publisher: { "@id": `${SITE.url}/#person` },
      screenshot: `${SITE.url}/og-image.png`,
      codeRepository: "https://github.com/Samthesurf/Campus_Career",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      keywords: [
        "event platform",
        "React 19",
        "Vite",
        "Cloudflare Pages",
        "Cloudflare D1",
        "programmatic SEO",
        "Recharts analytics",
        "client project",
        "Nigeria",
        "student conference",
      ].join(", "),
    },
    {
      "@type": "CreativeWork",
      "@id": `${SITE.url}/projects/campus-career#creativework`,
      name: "Campus to Career — Case Study",
      about: { "@id": `${SITE.url}/projects/campus-career#software` },
      creator: { "@id": `${SITE.url}/#person` },
      url: `${SITE.url}/projects/campus-career`,
      genre: "Case Study",
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE.url}/projects/campus-career#breadcrumb`,
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
          name: "Campus to Career",
          item: `${SITE.url}/projects/campus-career`,
        },
      ],
    },
  ],
};

export default function CampusCareerCaseStudyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] text-slate-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden transition-colors duration-300">
      <HeaderNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(campusJsonLd) }}
      />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* Hero */}
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                Case Study
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                Client Project
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="text-slate-900 dark:text-white">Campus </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                to Career
              </span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-500 dark:text-gray-400">
              Client project · Full-stack event platform
            </p>
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              I built the web platform for <strong>Campus to Career 2.0</strong>,
              a 1,000+ attendee student career conference in Nigeria. The goal
              was simple: make the event feel credible, explain why students
              should attend, and move visitors smoothly from learning what the
              event is about to buying tickets.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://campustocareer.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <div className="w-5 h-5">
                  <GlobeIcon />
                </div>
                <span>Visit Live Site</span>
              </a>
              <a
                href="https://github.com/Samthesurf/Campus_Career"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-900/20 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
              >
                <div className="w-5 h-5">
                  <GitHubIcon />
                </div>
                <span>View Code</span>
              </a>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-900/20 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
              >
                Back to Projects
              </Link>
            </div>
          </div>

          {/* Visual hero image */}
          <section className="mt-16">
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
              <Image
                src={campusDesktopHero}
                alt="Campus to Career live site hero with event date and venue details"
                className="w-full h-auto"
                priority
                placeholder="blur"
              />
            </div>
          </section>

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

          {/* Problem / Solution */}
          <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                The{" "}
                <span className="text-blue-500 dark:text-blue-400">
                  problem
                </span>
              </h2>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                The Campus to Career team needed more than a page announcing a
                date. They needed a site that made the event feel real,
                explained why students should care, and gave people a
                straightforward way to buy tickets without confusion. It also
                had to stay affordable to run and useful for the organizers
                after launch.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                The{" "}
                <span className="text-blue-500 dark:text-blue-400">
                  solution
                </span>
              </h2>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                I built a fast, mobile-friendly event platform with dedicated
                sections for speakers, schedule, highlights, FAQs, and
                ticketing. Behind the scenes, I added lightweight traffic and
                interest visibility, plus solid SEO foundations, so the team
                could promote the conference confidently and understand what was
                driving attention.
              </p>
            </div>
          </section>

          {/* Stack */}
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              How It Was{" "}
              <span className="text-blue-500 dark:text-blue-400">Built</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                <h3 className="text-lg font-bold mb-3">Public experience</h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- React 19 + Vite + TypeScript</li>
                  <li>- Responsive across desktop and mobile</li>
                  <li>- Clear sections for speakers, schedule, and FAQs</li>
                  <li>- Fast path from landing page to ticket purchase</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                <h3 className="text-lg font-bold mb-3">Organizer tools</h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- Cloudflare-backed event platform</li>
                  <li>- Simple view of traffic and audience interest</li>
                  <li>- Secure admin access for the team</li>
                  <li>- Selar redirect for ticketing</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                <h3 className="text-lg font-bold mb-3">Search + sharing</h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- SEO pages to help students discover the event</li>
                  <li>- Auto-generated sitemap and robots</li>
                  <li>- Custom social share image</li>
                  <li>- Analytics to see what was working</li>
                </ul>
              </div>
            </div>
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
                  Polished event experience
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- Strong hero and clear event overview</li>
                  <li>- Speakers, sponsors, and schedule sections</li>
                  <li>- Photo highlights gallery + FAQ</li>
                  <li>- Built to feel trustworthy on first visit</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold mb-3">
                  Smooth ticket path
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>
                    - Students can move from learning about the event to buying
                    tickets quickly
                  </li>
                  <li>- Ticketing calls-to-action stay clear across the site</li>
                  <li>- Selar redirects keep checkout simple</li>
                  <li>- Designed around mobile visitors</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold mb-3">Organizer visibility</h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- Lightweight view of traffic and interest over time</li>
                  <li>- Source breakdown to show where interest came from</li>
                  <li>- Quick read on sponsor and ticket funnel performance</li>
                  <li>- Useful insight without a heavyweight setup</li>
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold mb-3">Search-ready launch</h3>
                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                  <li>- Landing pages for relevant event searches</li>
                  <li>- Metadata tuned for previews and discovery</li>
                  <li>- Sitemap and robots generated automatically</li>
                  <li>- Branded social card for link sharing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Screenshots */}
          <section className="mt-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Product{" "}
              <span className="text-blue-500 dark:text-blue-400">
                Screenshots
              </span>
            </h2>
            <ProjectScreenshots
              title="Campus to Career"
              groups={screenshotGroups}
            />
          </section>

          {/* CTA */}
          <section className="mt-20">
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 p-10 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Need a polished web product for a real audience?
              </h2>
              <p className="text-white/90 max-w-2xl">
                I build client-ready web experiences that feel clear for users,
                useful for teams, and dependable behind the scenes.
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
