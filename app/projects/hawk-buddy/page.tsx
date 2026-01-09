import type { Metadata } from "next";
import Link from "next/link";

import HeaderNav from "../../../components/HeaderNav";
import StatsGrid from "../../../components/StatsGrid";
import ProjectScreenshots, { type ScreenshotGroup } from "../../../components/ProjectScreenshots";

import hawkBuddyDashboard from "../../../assets/images/hawk_buddy_dashboard_br.png";
import hawkBuddyDashboardAlt from "../../../assets/images/hawk_buddy_dashboard.png";
import screenTimeImg from "../../../assets/images/screen_time.jpg";
import appConfigImg from "../../../assets/images/App_config.jpg";

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

export const metadata: Metadata = {
    title: "Hawk Buddy",
    description:
        "AI-powered productivity coach that aligns phone usage with personal goals — featuring goal discovery, app monitoring, and real-time feedback (Flutter + FastAPI + Cloudflare D1).",
    alternates: {
        canonical: "/projects/hawk-buddy",
    },
};

const highlights = [
    { label: "Target Audience", value: "Young professionals & remote workers" },
    { label: "Problem Solved", value: "Digital distraction & phone addiction" },
    { label: "AI Integration", value: "Google Gemini" },
    { label: "Real-time DB", value: "Cloudflare D1 (SQLite at the edge)" },
    { label: "Backend", value: "FastAPI on Oracle Cloud (Docker)" },
    { label: "Vector Search", value: "Cloudflare Vectorize" },
];

const screenshotGroups: ScreenshotGroup[] = [
    {
        id: "mobile",
        label: "Mobile App",
        previewAspectClass: "aspect-[9/19]",
        thumbAspectClass: "aspect-[9/19]",
        previewMaxWidthClass: "max-w-md",
        items: [
            { src: hawkBuddyDashboard, alt: "Hawk Buddy dashboard (cozy UI)", imageClassName: "object-cover" },
            { src: screenTimeImg, alt: "Hawk Buddy screen time breakdown", imageClassName: "object-cover" },
            { src: appConfigImg, alt: "Hawk Buddy selected apps / configuration screen", imageClassName: "object-cover" },
        ],
    },
    {
        id: "alt",
        label: "Alternate Mock",
        previewAspectClass: "aspect-[9/16]",
        thumbAspectClass: "aspect-[9/16]",
        previewMaxWidthClass: "max-w-md",
        items: [
            { src: hawkBuddyDashboardAlt, alt: "Hawk Buddy dashboard mock (blue background)", imageClassName: "object-cover" },
        ],
    },
];

export default function HawkBuddyCaseStudyPage() {
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
                            <span className="text-slate-900 dark:text-white">Hawk </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                                Buddy
                            </span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                            An AI-powered productivity coach that aligns your phone usage with your goals — combining conversational goal discovery,
                            real-time app monitoring, and supportive, non-intrusive feedback.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="https://github.com/Samthesurf/pro_buddy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-transparent bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-gray-100 transition-all active:scale-95"
                            >
                                <div className="w-5 h-5">
                                    <GitHubIcon />
                                </div>
                                <span>View Code</span>
                            </a>
                            <a
                                href="https://pub-cf86be98216443899aa1280bf26bada2.r2.dev/hawk-buddy-v1-4.apk"
                                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-transparent bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
                            >
                                Download APK
                                <span aria-hidden>↓</span>
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
                        <ProjectScreenshots title="Hawk Buddy" groups={screenshotGroups} />
                    </section>

                    {/* Core Features */}
                    <section className="mt-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">
                            Core <span className="text-blue-500 dark:text-blue-400">Features</span>
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                                <h3 className="text-xl font-bold mb-3">AI Coaching Chat (Progress Check-ins)</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Daily conversations that feel like a supportive mentor</li>
                                    <li>- Goal-aware context and progress scoring (0–100%)</li>
                                    <li>- Streak tracking to build accountability habits</li>
                                    <li>- Notification context for seamless follow-ups</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                                <h3 className="text-xl font-bold mb-3">Conversational Goal Discovery</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Interactive onboarding quiz and follow-up questions</li>
                                    <li>- AI-generated notification profile based on personality</li>
                                    <li>- Habit & routine builder (focus blocks, morning routines)</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                                <h3 className="text-xl font-bold mb-3">Intelligent App Monitoring</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- AI app classification + goal alignment (Aligned / Neutral / Misaligned)</li>
                                    <li>- Contextual nudges when patterns drift off track</li>
                                    <li>- Usage history and pattern analysis over time</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8">
                                <h3 className="text-xl font-bold mb-3">Smart Notifications (No Spam)</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Atomic cooldown checks via Cloudflare D1 Worker</li>
                                    <li>- Rate limiting to prevent notification fatigue</li>
                                    <li>- Positive reinforcement for healthy usage patterns</li>
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
                                <h3 className="text-lg font-bold mb-3">Mobile App</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Flutter + Dart</li>
                                    <li>- flutter_bloc (Cubits) for predictable state</li>
                                    <li>- Secure token storage + restoration service</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                                <h3 className="text-lg font-bold mb-3">Backend API</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- FastAPI (Python) + Uvicorn</li>
                                    <li>- Gemini AI for chat, profiling, classification</li>
                                    <li>- Firebase Admin verification</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-8">
                                <h3 className="text-lg font-bold mb-3">Edge + Persistence</h3>
                                <ul className="space-y-2 text-slate-600 dark:text-gray-400">
                                    <li>- Cloudflare D1 for global low-latency writes</li>
                                    <li>- Workers for atomic cooldown transactions</li>
                                    <li>- Vectorize for semantic embeddings</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="mt-20">
                        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 p-10 text-white">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">Building a product that needs AI + real-time systems?</h2>
                            <p className="text-white/90 max-w-2xl">
                                I can help you design reliable AI flows, ship polished mobile UX, and deploy globally with edge-first infrastructure.
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
