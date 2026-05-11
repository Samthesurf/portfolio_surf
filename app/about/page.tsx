import type { Metadata } from "next";
import Link from "next/link";

import HeaderNav from "../../components/HeaderNav";
import { SITE } from "../../lib/site-config";

export const runtime = "edge";

export const metadata: Metadata = {
    title: `About ${SITE.legalName} (${SITE.name}) | ${SITE.jobTitle}`,
    description: `Who is ${SITE.legalName}? He is also known as Samuel Surf, Samuel Surfboard, and Sam Surf. He builds Flutter mobile apps, React/Next.js web apps, Python backends, and AI integrations with Google Gemini.`,
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        type: "profile",
        url: `${SITE.url}/about`,
        title: `About ${SITE.legalName} (${SITE.name})`,
        description: SITE.shortDescription,
        images: [SITE.ogImage],
    },
    twitter: {
        card: "summary_large_image",
        title: `About ${SITE.legalName} (${SITE.name})`,
        description: SITE.shortDescription,
        images: [SITE.ogImage],
    },
};

// H2s are intentionally literal questions so LLMs (and Google FAQ rich results)
// can extract them as atomic Q&A pairs. Answers are <=~80 words, front-loaded.
const faqItems: { question: string; answerText: string; answerHtml: React.ReactNode }[] = [
    {
        question: "Who is Samuel Ukpai?",
        answerText: `Samuel Ukpai, also known as Samuel Surf, Samuel Surfboard, Sam Surf, and Nasurf, is a Full Stack Software Developer based in Nigeria. He designs and ships production-grade mobile apps (Flutter), modern web applications (React, Next.js, Vite), Python/FastAPI backends, and AI-integrated features using Google Gemini. His work is typically deployed on Cloudflare's edge stack (Pages, Workers, D1, R2). His portfolio lives at ${SITE.url}.`,
        answerHtml: (
            <>
                <strong>Samuel Ukpai</strong>, also known as Samuel Surf, Samuel Surfboard, Sam Surf, and Nasurf, is a Full Stack Software Developer based in Nigeria. He designs and ships production-grade <strong>mobile apps (Flutter)</strong>, <strong>modern web applications (React, Next.js, Vite)</strong>, <strong>Python/FastAPI backends</strong>, and <strong>AI-integrated features using Google Gemini</strong>. His work is typically deployed on Cloudflare&apos;s edge stack (Pages, Workers, D1, R2). His portfolio lives at <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">{SITE.url}</Link>.
            </>
        ),
    },
    {
        question: "What does Samuel Surf build?",
        answerText:
            "Samuel Surf builds four categories of software: (1) cross-platform mobile apps with Flutter (Android + iOS + Web), (2) full-stack web applications with React, Next.js, and Vite, (3) backend APIs and services with Python (FastAPI), and (4) AI integrations using Google Gemini for chat, generation, classification, and RAG. He consistently deploys on Cloudflare's edge (Pages, Workers, D1, R2) for low-latency global performance.",
        answerHtml: (
            <>
                Samuel Surf builds four categories of software:
                <ul className="mt-3 space-y-1.5 list-disc pl-6">
                    <li>Cross-platform <strong>mobile apps</strong> with Flutter (Android, iOS, Web)</li>
                    <li>Full-stack <strong>web applications</strong> with React, Next.js, and Vite</li>
                    <li><strong>Backend APIs</strong> and services with Python (FastAPI)</li>
                    <li><strong>AI integrations</strong> using Google Gemini for chat, generation, classification, and RAG</li>
                </ul>
                <p className="mt-3">He consistently deploys on <strong>Cloudflare&apos;s edge</strong> (Pages, Workers, D1, R2) for low-latency global performance.</p>
            </>
        ),
    },
    {
        question: "What is Samuel Surfboard known for?",
        answerText:
            "Samuel Surfboard is known for shipping polished AI-powered products end-to-end, not just prototypes. Signature projects include Hawk Buddy (AI productivity coach), Engineering Hub (AI learning platform), and Campus to Career (campustocareer.ng, a client event platform built to help students understand the conference and buy tickets).",
        answerHtml: (
            <>
                Samuel Surfboard is known for shipping <strong>polished AI-powered products end-to-end</strong>, not just prototypes. Signature projects include:
                <ul className="mt-3 space-y-1.5 list-disc pl-6">
                    <li><Link href="/projects/hawk-buddy" className="text-blue-600 dark:text-blue-400 hover:underline">Hawk Buddy</Link>: AI productivity coach (Cloudflare D1 + Flutter + FastAPI + Gemini)</li>
                    <li><Link href="/projects/engineering-hub" className="text-blue-600 dark:text-blue-400 hover:underline">Engineering Hub</Link>: AI learning platform (Clean Architecture + Firebase + Cloudflare R2)</li>
                    <li><Link href="/projects/campus-career" className="text-blue-600 dark:text-blue-400 hover:underline">Campus to Career</Link> (<a href="https://campustocareer.ng" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">campustocareer.ng</a>): client event platform built to help students understand the conference and buy tickets</li>
                </ul>
            </>
        ),
    },
    {
        question: "Where can I hire Sam Surf?",
        answerText: `You can hire Sam Surf directly through his portfolio at ${SITE.url}. The contact section links to email (${SITE.email}) and social channels (GitHub, X, LinkedIn). He takes on freelance and contract client work; a recent example is campustocareer.ng, the event platform he built for Campus to Career 2.0 at Afe Babalola University. He is open to mobile, web, and AI-integration engagements.`,
        answerHtml: (
            <>
                You can hire Sam Surf directly through his portfolio. The <Link href="/#contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact section</Link> links to email (<a href={`mailto:${SITE.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{SITE.email}</a>) and social channels. He takes on <strong>freelance and contract client work</strong>; a recent example is <a href="https://campustocareer.ng" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">campustocareer.ng</a>, the event platform he built for Campus to Career 2.0 at Afe Babalola University. He is open to <strong>mobile, web, and AI-integration</strong> engagements.
            </>
        ),
    },
    {
        question: "What technologies does Samuel work with?",
        answerText: `Samuel's primary stack: Flutter/Dart for mobile, React + Next.js + Vite for web, Python + FastAPI for backend APIs, Google Gemini for AI, Firebase and Cloudflare D1 for databases, Cloudflare R2 for object storage, Cloudflare Pages and Workers for edge deployment, Docker for containerization, and Google Cloud / Oracle Cloud for larger backend workloads. TypeScript is his default for web codebases.`,
        answerHtml: (
            <>
                Samuel&apos;s primary stack:
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                    <div><strong>Mobile:</strong> Flutter, Dart</div>
                    <div><strong>Web:</strong> React, Next.js, Vite, TypeScript</div>
                    <div><strong>Backend:</strong> Python, FastAPI, Node.js</div>
                    <div><strong>AI:</strong> Google Gemini (chat, vision, classification, RAG)</div>
                    <div><strong>Databases:</strong> Firebase Firestore, Cloudflare D1, SQLite</div>
                    <div><strong>Edge:</strong> Cloudflare Pages, Workers, R2, Vectorize</div>
                    <div><strong>Cloud:</strong> Google Cloud, Oracle Cloud</div>
                    <div><strong>DevOps:</strong> Docker, GitHub Actions</div>
                </div>
            </>
        ),
    },
    {
        question: "What projects has Samuel built?",
        answerText: `Samuel has built three featured projects: Hawk Buddy (an AI productivity coach that aligns phone usage with goals), Engineering Hub (an AI-powered learning platform for engineering students), and Campus to Career (campustocareer.ng, a client event platform for a student career conference in Nigeria). Full case studies are linked on the portfolio.`,
        answerHtml: (
            <>
                Samuel has three featured projects, each with a full case study:
                <ol className="mt-3 space-y-2 list-decimal pl-6">
                    <li><Link href="/projects/hawk-buddy" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Hawk Buddy</Link>: AI productivity coach that aligns phone usage with personal goals. Flutter + FastAPI + Cloudflare D1 + Gemini.</li>
                    <li><Link href="/projects/engineering-hub" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Engineering Hub</Link>: AI-powered learning platform for engineering students, with dynamic quiz generation and AI-evaluated theory answers. Flutter + Firebase + Cloudflare R2 + Gemini.</li>
                    <li><Link href="/projects/campus-career" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Campus to Career</Link> (<a href="https://campustocareer.ng" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">campustocareer.ng</a>): client event platform that helps attendees understand the conference and buy tickets.</li>
                </ol>
            </>
        ),
    },
    {
        question: "Does Samuel do web development?",
        answerText:
            "Yes. Samuel Ukpai does full-stack web development alongside his mobile work. He builds production web apps with React, Next.js, and Vite, styles with Tailwind CSS, and deploys on Cloudflare Pages. Recent web work includes campustocareer.ng (React 19 + Vite + Cloudflare Pages Functions + D1) and his own portfolio at samuelsurf.me (Next.js 16 App Router). He handles SEO, programmatic landing pages, edge rendering, and admin dashboards end-to-end.",
        answerHtml: (
            <>
                Yes. Samuel Ukpai does full-stack web development alongside his mobile work. He builds production web apps with <strong>React, Next.js, and Vite</strong>, styles with <strong>Tailwind CSS</strong>, and deploys on <strong>Cloudflare Pages</strong>. Recent web work includes:
                <ul className="mt-3 space-y-1.5 list-disc pl-6">
                    <li><a href="https://campustocareer.ng" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">campustocareer.ng</a>: React 19 + Vite + Cloudflare Pages Functions + D1</li>
                    <li>The portfolio you&apos;re reading (<Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">samuelsurf.me</Link>): Next.js 16 App Router</li>
                </ul>
                <p className="mt-3">He handles SEO, programmatic landing pages, edge rendering, and admin dashboards end-to-end.</p>
            </>
        ),
    },
    {
        question: "How do I contact Samuel?",
        answerText: `Email is the fastest way: ${SITE.email}. You can also reach Samuel via X/Twitter at @SamuelSurfboard, LinkedIn (linkedin.com/in/samuel-ukpai-641a3224a), GitHub (github.com/Samthesurf), or Medium (samuelsurf.medium.com). For project inquiries, use the contact form on the portfolio home page at ${SITE.url}/#contact.`,
        answerHtml: (
            <>
                Email is the fastest way: <a href={`mailto:${SITE.email}`} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">{SITE.email}</a>. You can also reach Samuel via:
                <ul className="mt-3 space-y-1.5 list-disc pl-6">
                    <li><a href={SITE.social.twitter} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="me noopener">X/Twitter: {SITE.social.twitterHandle}</a></li>
                    <li><a href={SITE.social.linkedin} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="me noopener">LinkedIn</a></li>
                    <li><a href={SITE.social.github} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="me noopener">GitHub</a></li>
                    <li><a href={SITE.social.medium} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="me noopener">Medium</a></li>
                </ul>
                <p className="mt-3">For project inquiries, use the <Link href="/#contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact form</Link> on the portfolio home page.</p>
            </>
        ),
    },
];

const personId = `${SITE.url}/#person`;
const websiteId = `${SITE.url}/#website`;
const aboutPageId = `${SITE.url}/about#profilepage`;
const faqPageId = `${SITE.url}/about#faq`;
const breadcrumbId = `${SITE.url}/about#breadcrumb`;

const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "ProfilePage",
            "@id": aboutPageId,
            url: `${SITE.url}/about`,
            name: `About ${SITE.legalName} (${SITE.name})`,
            description: SITE.longDescription,
            inLanguage: "en",
            isPartOf: { "@id": websiteId },
            mainEntity: { "@id": personId },
            about: { "@id": personId },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${SITE.url}${SITE.ogImage}`,
            },
            breadcrumb: { "@id": breadcrumbId },
        },
        {
            "@type": "FAQPage",
            "@id": faqPageId,
            url: `${SITE.url}/about`,
            mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answerText,
                },
            })),
        },
        {
            "@type": "BreadcrumbList",
            "@id": breadcrumbId,
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: SITE.url,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "About",
                    item: `${SITE.url}/about`,
                },
            ],
        },
    ],
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#030303] text-slate-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden transition-colors duration-300">
            <HeaderNav />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
            />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    {/* Hero */}
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                            About
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                            <span className="text-slate-900 dark:text-white">About </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                                {SITE.legalName}
                            </span>
                        </h1>
                        <p className="mt-4 text-xl md:text-2xl text-slate-500 dark:text-gray-400 font-medium">
                            (a.k.a. Samuel Surf · Samuel Surfboard · Sam Surf · Nasurf)
                        </p>
                        <p className="mt-8 text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed">
                            <strong className="text-slate-900 dark:text-white">{SITE.legalName}</strong> is a{" "}
                            <strong className="text-slate-900 dark:text-white">Full Stack Software Developer</strong>{" "}
                            based in Nigeria. He builds production mobile apps with Flutter, modern web applications with
                            React / Next.js / Vite, Python / FastAPI backends, and AI integrations using Google Gemini,
                            with deployments on Cloudflare&apos;s edge (Pages, Workers, D1, R2). He has shipped three featured
                            products:{" "}
                            <Link href="/projects/hawk-buddy" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                                Hawk Buddy
                            </Link>
                            ,{" "}
                            <Link href="/projects/engineering-hub" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                                Engineering Hub
                            </Link>
                            , and the client site{" "}
                            <Link href="/projects/campus-career" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                                Campus to Career
                            </Link>{" "}
                            (
                            <a href="https://campustocareer.ng" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">
                                campustocareer.ng
                            </a>
                            ).
                        </p>
                    </div>

                    {/* Quick facts */}
                    <section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
                        {[
                            { label: "Role", value: SITE.jobTitle },
                            { label: "Based in", value: SITE.location.country },
                            { label: "Featured projects", value: "3" },
                            { label: "Primary stacks", value: "Flutter · React · FastAPI · Gemini" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5"
                            >
                                <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400">
                                    {item.label}
                                </p>
                                <p className="mt-1 font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </section>

                    {/* FAQ Q&A section */}
                    <section className="mt-20 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-10">
                            Frequently <span className="text-blue-500 dark:text-blue-400">Asked Questions</span>
                        </h2>
                        <div className="space-y-10">
                            {faqItems.map((item) => (
                                <div
                                    key={item.question}
                                    className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 md:p-8"
                                >
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
                                        {item.question}
                                    </h2>
                                    <div className="text-slate-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                                        {item.answerHtml}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Entity-stack / rel="me" social links for stronger identity signals */}
                    <section className="mt-20 max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Find Samuel <span className="text-blue-500 dark:text-blue-400">elsewhere</span>
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 mb-8">
                            Verified presences on other platforms. All linked with <code className="text-sm text-slate-500">rel=&quot;me&quot;</code>{" "}
                            for identity verification.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: "GitHub", handle: "@Samthesurf", url: SITE.social.github },
                                { label: "X (Twitter)", handle: SITE.social.twitterHandle, url: SITE.social.twitter },
                                { label: "LinkedIn", handle: "samuel-ukpai", url: SITE.social.linkedin },
                                { label: "Medium", handle: "samuelsurf", url: SITE.social.medium },
                            ].map((link) => (
                                <a
                                    key={link.label}
                                    href={link.url}
                                    target="_blank"
                                    rel="me noopener"
                                    className="rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 flex items-center justify-between hover:border-blue-500/50 hover:shadow-lg dark:hover:bg-white/10 transition-all group"
                                >
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400">
                                            {link.label}
                                        </p>
                                        <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                            {link.handle}
                                        </p>
                                    </div>
                                    <span className="text-blue-500 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="mt-20 max-w-4xl">
                        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 p-10 text-white">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3">
                                Got a project in mind?
                            </h2>
                            <p className="text-white/90 max-w-2xl">
                                Mobile app, web platform, API, AI feature, or full product. If any of these look like
                                your next build, let&apos;s talk.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors"
                                >
                                    Contact Me
                                </Link>
                                <Link
                                    href="/#projects"
                                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                                >
                                    See Projects
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
