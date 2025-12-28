"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Import assets
import hawkBuddyDashboard from "../assets/images/hawk_buddy_dashboard.png";
import firebaseLogo from "../assets/firebase-1.svg";
import cloudflareLogo from "../assets/cloudflare.svg";
import oracleLogo from "../assets/oracle-corporation-logo.svg";
import dockerLogo from "../assets/docker-4.svg";
import geminiLogo from "../assets/500px-Google_Gemini_icon_2025.svg.png";
import flutterLogo from "../assets/dart.svg"; // Fallback or if user wants Dart key
// Note: Flutter icon not found in assets, keeping inline or using Dart if preferred. 
// Given the user said "all wrong icons" and listed specific ones, I will update those.
// For Flutter, since it wasn't in the "wrong" list, I'll keep the inline one but make it cleaner, 
// OR I can use the dart logo if that's what they meant. I'll stick to inline Flutter for accuracy of "Flutter".

// --- Icon Components ---

// Keeping Flutter inline as it wasn't flagged as wrong and no specific flutter.svg in assets
const FlutterIcon = () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#42A5F5" d="M12.3 64.2L76.3 0h39.4L32.1 83.6z" />
        <path fill="#42A5F5" d="M76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.9z" />
        <path fill="#0D47A1" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z" />
        <path fill="#1565C0" d="M115.7 128L81.6 93.9l-19.4 19.6L76.3 128z" />
    </svg>
);

const FirebaseIcon = () => (
    <div className="w-full h-full relative">
        <Image src={firebaseLogo} alt="Firebase" fill className="object-contain" />
    </div>
);

const CloudflareIcon = () => (
    <div className="w-full h-full relative">
        <Image src={cloudflareLogo} alt="Cloudflare" fill className="object-contain" />
    </div>
);

const OracleIcon = () => (
    <div className="w-full h-full relative">
        <Image src={oracleLogo} alt="Oracle" fill className="object-contain" />
    </div>
);

const DockerIcon = () => (
    <div className="w-full h-full relative">
        <Image src={dockerLogo} alt="Docker" fill className="object-contain" />
    </div>
);

const GeminiIcon = () => (
    <div className="w-full h-full relative">
        <Image src={geminiLogo} alt="Gemini" fill className="object-contain" />
    </div>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const LinkIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

// --- Projects Data ---
const projects = [
    {
        title: "Hawk Buddy",
        description: "AI-Powered Productivity Coach that Aligns Your Phone Usage with Your Goals",
        longDescription: "Hawk Buddy is a goal-aligned productivity companion that helps users reclaim control over their digital habits. Unlike traditional screen-time apps that simply block or limit usage, Hawk Buddy takes an intelligent approach: it understands why you use certain apps and determines whether that usage aligns with your personal goals. The app features an AI-powered conversational coach that provides encouragement, feedback, and personalized progress summaries, making productivity feel like having a supportive buddy rather than a restrictive tool.",
        image: hawkBuddyDashboard,
        tags: ["Flutter", "FastAPI", "Gemini AI", "Cloudflare", "Firebase", "Oracle Cloud"],
        techStack: [
            { name: "Flutter", icon: FlutterIcon },
            { name: "Firebase", icon: FirebaseIcon },
            { name: "Cloudflare", icon: CloudflareIcon },
            { name: "Oracle", icon: OracleIcon },
            { name: "Docker", icon: DockerIcon },
            { name: "Gemini", icon: GeminiIcon },
        ],
        links: {
            github: "https://github.com/Samthesurf/pro_buddy",
            demo: "#",
        },
        featured: true,
    }
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#050505] transition-colors duration-300"
        >
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-slate-900 dark:text-white">Featured </span>
                        <span className="text-blue-500 dark:text-blue-400">Projects</span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        A showcase of my recent work, highlighting complex full-stack applications and AI integrations.
                    </p>
                </div>

                {/* Projects List */}
                <div className="space-y-20 md:space-y-32">
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            className={`flex flex-col lg:flex-row gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {/* Project Image */}
                            <div className="w-full lg:w-1/2 relative group">
                                <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 rounded-2xl md:rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-slate-900">
                                    <div className="aspect-[4/3] md:aspect-[16/9] relative">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                            {project.title}
                                        </h3>
                                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
                                            Full Stack
                                        </span>
                                    </div>
                                    <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
                                        {project.description}
                                    </p>
                                    <p className="text-slate-500 dark:text-gray-500 leading-relaxed">
                                        {project.longDescription}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-4">
                                        Powered By
                                    </h4>
                                    <div className="flex flex-wrap gap-4">
                                        {project.techStack.map((tech) => {
                                            const Icon = tech.icon;
                                            return (
                                                <div
                                                    key={tech.name}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/30 transition-colors"
                                                    title={tech.name}
                                                >
                                                    <div className="w-5 h-5">
                                                        <Icon />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
                                                        {tech.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <a
                                        href={project.links.github}
                                        target="_blank" // Open in new tab
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-gray-100 transition-all active:scale-95"
                                    >
                                        <div className="w-5 h-5">
                                            <GitHubIcon />
                                        </div>
                                        <span>View Code</span>
                                    </a>
                                    <a
                                        href={project.links.demo}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 text-slate-700 dark:text-white font-semibold transition-all hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95"
                                    >
                                        <LinkIcon />
                                        <span>Live Demo</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
