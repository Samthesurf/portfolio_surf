import type { Metadata } from "next";
import Link from "next/link";

import HeaderNav from "../../../components/HeaderNav";
import StatsGrid from "../../../components/StatsGrid";
import ProjectScreenshots, { type ScreenshotGroup } from "../../../components/ProjectScreenshots";

import engineeringHubDesktop1 from "../../../assets/Engineering-Hub/desktop_view.png";
import engineeringHubDesktop2 from "../../../assets/Engineering-Hub/desktop_view_2.png";
import engineeringHubMobileOnboarding from "../../../assets/Engineering-Hub/photo_2026-01-09_16-51-21.png";
import engineeringHubMobilePerformance from "../../../assets/Engineering-Hub/photo_2026-01-09_16-51-13.png";
import engineeringHubMobileStreaks from "../../../assets/Engineering-Hub/photo_2026-01-09_16-51-17.png";

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const GlobeIcon = () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const metadata: Metadata = {
    title: "Engineering Hub",
    description:
        "AI-powered educational platform for engineering students with quiz generation, course management, and edge-delivered documents (Cloudflare R2 + Workers).",
    alternates: {
        canonical: "/projects/engineering-hub",
    },
};

const highlights = [
    { label: "Platforms", value: "Android, Web (iOS-ready)" },
    { label: "Architecture", value: "Clean Architecture (BLoC/GetX)" },
    { label: "AI Integration", value: "Google Gemini" },
    { label: "Real-time DB", value: "Firebase Firestore" },
    { label: "Edge CDN", value: "Cloudflare R2 + Workers" },
    { label: "Core Value", value: "Personalized learning & fast document delivery" },
];

const screenshotGroups: ScreenshotGroup[] = [
    {
        id: "desktop",
        label: "Desktop / Web",
        previewAspectClass: "aspect-[16/10]",
        thumbAspectClass: "aspect-[16/10]",
        previewMaxWidthClass: "max-w-5xl",
        items: [
            { src: engineeringHubDesktop1, alt: "Engineering Hub web dashboard (courses overview)", imageClassName: "object-cover object-top" },
            { src: engineeringHubDesktop2, alt: "Engineering Hub analytics / insights view", imageClassName: "object-cover object-top" },
        ],
    },
    {
        id: "mobile",
        label: "Mobile",
        previewAspectClass: "aspect-[9/19]",
        thumbAspectClass: "aspect-[9/19]",
        previewMaxWidthClass: "max-w-md",
        items: [
            { src: engineeringHubMobilePerformance, alt: "Engineering Hub mobile performance chart screen", imageClassName: "object-cover" },
            { src: engineeringHubMobileStreaks, alt: "Engineering Hub streaks and calendar screen", imageClassName: "object-cover" },
            { src: engineeringHubMobileOnboarding, alt: "Engineering Hub onboarding / get started screen", imageClassName: "object-cover" },
        ],
    },
];

export default function EngineeringHubCaseStudyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#030303] text-slate-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden transition-colors duration-300">
            <HeaderNav />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    {/* Hero */}
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                            Case Study
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                            <span className="text-slate-900 dark:text-white">Engineering </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                                Hub
                            </span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                            An AI-powered educational platform for engineering students — built with Clean Architecture and powered by Gemini for quiz generation,
                            answer evaluation, and personalized learning experiences.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="https://engineering-hub-nine.vercel.app/learn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-transparent bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-gray-100 transition-all active:scale-95"
                            >
                                <div className="w-5 h-5">
                                    <GlobeIcon />
                                </div>
                                <span>Visit Site</span>
                            </a>
                            <Link
                                href="/#projects"
                                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-slate-900/20 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
                            >
                                Back to Projects
                            </Link>
                        </div>
                    </div>

                    {/* Highlights */}
                    <section className="mt-16">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Key <span className="text-blue-500 dark:text-blue-400">Highlights</span>
                        </h2>
                        <StatsGrid stats={highlights} />
                    </section>

                    {/* Screenshots */}
                    <section className="mt-16">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Product <span className="text-blue-500 dark:text-blue-400">Screenshots</span>
                        </h2>
                        <ProjectScreenshots title="Engineering Hub" groups={screenshotGroups} />
                    </section>

                    {/* Core Features */}
                    <section className="mt-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">
                            Core <span className="text-blue-500 dark:text-blue-400">Features</span>
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                                <h3 className="text-xl font-bold mb-3">AI-Powered Learning (TuteBot)</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Dynamic quiz generation (MCQ, theory, fill-in-the-gap) from course materials</li>
                                    <li>- AI-evaluated theory answers with strengths + improvement suggestions</li>
                                    <li>- Image-based evaluation for handwritten solutions (vision)</li>
                                    <li>- LaTeX rendering support for math/science content</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                                <h3 className="text-xl font-bold mb-3">Course & Content Management</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Courses organized by department and level (100–500)</li>
                                    <li>- Multi-level caching for reliable offline study</li>
                                    <li>- Professional in-app PDF viewing optimized for textbooks</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                                <h3 className="text-xl font-bold mb-3">Edge-Powered Document Delivery</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Cloudflare R2 storage with range-request support for large PDFs</li>
                                    <li>- Worker proxy with long-lived caching for fast global access</li>
                                    <li>- CORS management and safe in-browser viewing</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                                <h3 className="text-xl font-bold mb-3">Schedule + Gamification</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Departmental timetables and reminders</li>
                                    <li>- Streak tracking and celebratory feedback loops</li>
                                    <li>- Progress analytics to build consistent habits</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Architecture + Stack */}
                    <section className="mt-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">
                            Architecture & <span className="text-blue-500 dark:text-blue-400">Stack</span>
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                                <h3 className="text-lg font-bold mb-3">Frontend</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Flutter 3.x + Dart</li>
                                    <li>- BLoC / GetX (Clean Architecture)</li>
                                    <li>- Web + Android (iOS-ready)</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                                <h3 className="text-lg font-bold mb-3">AI + Data</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Google Gemini</li>
                                    <li>- Firestore for real-time state</li>
                                    <li>- Response sanitization for LaTeX-safe parsing</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                                <h3 className="text-lg font-bold mb-3">Edge Delivery</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Cloudflare R2 for PDFs</li>
                                    <li>- Workers proxy with caching and range requests</li>
                                    <li>- Sub-100ms global access for core assets</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="mt-20">
                        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 p-10 text-white">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">Want something like this built for your users?</h2>
                            <p className="text-white/90 max-w-2xl">
                                If you’re building an AI-enabled product or a high-performance app, I can help with architecture, implementation, and shipping.
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
