"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Import assets
import hawkBuddyDashboard from "../assets/images/hawk_buddy_dashboard_br.png";
import screenTimeImg from "../assets/images/screen_time.jpg";
import appConfigImg from "../assets/images/App_config.jpg";

// Engineering Hub screenshots
import engineeringHubDesktop1 from "../assets/Engineering-Hub/desktop_view.png";
import engineeringHubDesktop2 from "../assets/Engineering-Hub/desktop_view_2.png";
import engineeringHubMobileOnboarding from "../assets/Engineering-Hub/photo_2026-01-09_16-51-21.png";
import engineeringHubMobilePerformance from "../assets/Engineering-Hub/photo_2026-01-09_16-51-13.png";
import engineeringHubMobileStreaks from "../assets/Engineering-Hub/photo_2026-01-09_16-51-17.png";

import firebaseLogo from "../assets/firebase-1.svg";
import cloudflareLogo from "../assets/cloudflare.svg";
import oracleLogo from "../assets/oracle-corporation-logo.svg";
import dockerLogo from "../assets/docker-4.svg";
import googleCloudLogo from "../assets/google-cloud-1.svg";
import geminiLogo from "../assets/500px-Google_Gemini_icon_2025.svg.png";

// --- Helper Components ---

const PhoneFrame = ({ src, alt, className = "", hideNotch = false }: { src: any; alt: string; className?: string, hideNotch?: boolean }) => (
    <div className={`relative h-full w-full bg-[#121212] rounded-[2.5rem] shadow-xl border-[6px] border-[#1a1a1a] ring-1 ring-white/10 overflow-hidden ${className}`}>
        {/* Screen Content */}
        <div className="relative h-full w-full bg-white dark:bg-black rounded-[2rem] overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
            />
        </div>
        {/* Notch */}
        {!hideNotch && <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20" />}
    </div>
);

const DesktopFrame = ({ src, alt, className = "" }: { src: any; alt: string; className?: string }) => (
    <div className={`relative w-full aspect-[16/10] bg-[#121212] rounded-xl shadow-2xl border-[6px] border-[#1a1a1a] ring-1 ring-white/10 overflow-hidden ${className}`}>
        {/* Window Controls */}
        <div className="absolute top-0 left-0 w-full h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 z-20 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        {/* Screen Content */}
        <div className="relative h-full w-full bg-slate-900 pt-8">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover object-top"
            />
        </div>
    </div>
);

// --- Icon Components ---

const FlutterIcon = () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
        <path fill="#42A5F5" d="M12.3 64.2L76.3 0h39.4L32.1 83.6z" />
        <path fill="#42A5F5" d="M76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.9z" />
        <path fill="#0D47A1" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z" />
        <path fill="#1565C0" d="M115.7 128L81.6 93.9l-19.4 19.6L76.3 128z" />
    </svg>
);

const PythonIcon = () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
            <stop offset="0" stopColor="#5A9FD4" />
            <stop offset="1" stopColor="#306998" />
        </linearGradient>
        <linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
            <stop offset="0" stopColor="#FFD43B" />
            <stop offset="1" stopColor="#FFE873" />
        </linearGradient>
        <path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)" />
        <path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)" />
        <path fill="#366994" d="M463.554 119.285c0 10.213 8.308 17.201 19.62 17.201 11.312 0 19.62-6.988 19.62-17.201v-76.37h-19.62v74.565c0 .629-.629.749-.943.749-.313 0-.942-.12-.942-.749V42.915h-17.735v76.37z" />
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

const GoogleCloudIcon = () => (
    <div className="w-full h-full relative">
        <Image src={googleCloudLogo} alt="Google Cloud" fill className="object-contain" />
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

const GlobeIcon = () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LinkIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

// --- Types ---

type ProjectLayout = 'mobile-fan' | 'desktop-mobile-hybrid';

interface Project {
    title: string;
    description: string;
    longDescription: string;
    layout: ProjectLayout;
    images: {
        // For mobile-fan
        main?: any;
        left?: any;
        right?: any;
        // For desktop-mobile-hybrid
        desktop?: any;
        mobile?: any;
        desktopGallery?: any[];
        mobileGallery?: any[];
    };
    tags: string[];
    techStack: { name: string; icon: any }[];
    links: {
        github?: string;
        demo: string;
        site?: string;
        apkDownload?: string;
        caseStudy?: string;
    };
    featured: boolean;
    isMainImageFrameless?: boolean;
    hideMobileNotch?: boolean;
}

// --- Projects Data ---
const projects: Project[] = [
    {
        title: "Engineering Hub",
        description: "AI-Powered educational platform with robust RAG and question generation system.",
        longDescription: "Engineering Hub is a cross-platform mobile and web application that transforms how engineering students access course materials. Built with Clean Architecture, it leverages Gemini and a robust RAG (Retrieval-Augmented Generation) system to provide personalized learning experiences, including dynamic quiz generation from course content and AI-evaluated theory answers. It features a scalable microservices backend deployed on Google Cloud and Docker.",
        layout: 'desktop-mobile-hybrid',
        images: {
            desktop: engineeringHubDesktop1,
            mobile: engineeringHubMobilePerformance,
            desktopGallery: [engineeringHubDesktop1, engineeringHubDesktop2],
            mobileGallery: [engineeringHubMobilePerformance, engineeringHubMobileStreaks, engineeringHubMobileOnboarding],
        },
        tags: ["Flutter", "Firebase", "Google Cloud", "Docker", "Gemini AI", "Dart"],
        techStack: [
            { name: "Flutter", icon: FlutterIcon },
            { name: "Firebase", icon: FirebaseIcon },
            { name: "Google Cloud", icon: GoogleCloudIcon },
            { name: "Docker", icon: DockerIcon },
            { name: "Cloudflare", icon: CloudflareIcon },
            { name: "Gemini", icon: GeminiIcon },
        ],
        links: {
            site: "https://engineering-hub-nine.vercel.app/learn",
            demo: "#", // Add link if available
            apkDownload: "#",
            caseStudy: "/projects/engineering-hub",
        },
        featured: true,
        hideMobileNotch: true,
    },
    {
        title: "Hawk Buddy",
        description: "AI-Powered Productivity Coach that Aligns Your Phone Usage with Your Goals",
        longDescription: "Hawk Buddy is a goal-aligned productivity companion that helps users reclaim control over their digital habits. Unlike traditional screen-time apps that simply block or limit usage, Hawk Buddy takes an intelligent approach: it understands why you use certain apps and determines whether that usage aligns with your personal goals. The app features an AI-powered conversational coach that provides encouragement, feedback, and personalized progress summaries.",
        layout: 'mobile-fan',
        images: {
            main: hawkBuddyDashboard,
            left: screenTimeImg,
            right: appConfigImg,
        },
        tags: ["Flutter", "Python", "FastAPI", "Gemini AI", "Cloudflare", "Firebase", "Oracle Cloud"],
        techStack: [
            { name: "Flutter", icon: FlutterIcon },
            { name: "Python", icon: PythonIcon },
            { name: "Firebase", icon: FirebaseIcon },
            { name: "Cloudflare", icon: CloudflareIcon },
            { name: "Oracle", icon: OracleIcon },
            { name: "Docker", icon: DockerIcon },
            { name: "Gemini", icon: GeminiIcon },
        ],
        links: {
            github: "https://github.com/Samthesurf/pro_buddy",
            demo: "#",
            apkDownload: "https://pub-cf86be98216443899aa1280bf26bada2.r2.dev/hawk-buddy-v1-4.apk",
            caseStudy: "/projects/hawk-buddy",
        },
        featured: true,
        isMainImageFrameless: true,
    }
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedScreens, setSelectedScreens] = useState<Record<string, { desktop: number; mobile: number }>>({});
    const [lightbox, setLightbox] = useState<null | { projectTitle: string; kind: "desktop" | "mobile"; index: number }>(null);

    const setActiveScreen = (projectTitle: string, kind: "desktop" | "mobile", index: number) => {
        setSelectedScreens((prev) => {
            const current = prev[projectTitle] ?? { desktop: 0, mobile: 0 };
            return {
                ...prev,
                [projectTitle]: {
                    ...current,
                    [kind]: index,
                },
            };
        });
    };

    const lightboxProject = lightbox ? projects.find((p) => p.title === lightbox.projectTitle) : null;
    const lightboxGallery =
        lightbox && lightboxProject
            ? (lightbox.kind === "desktop"
                ? (lightboxProject.images.desktopGallery ?? (lightboxProject.images.desktop ? [lightboxProject.images.desktop] : []))
                : (lightboxProject.images.mobileGallery ?? (lightboxProject.images.mobile ? [lightboxProject.images.mobile] : [])))
            : [];
    const lightboxLen = lightboxGallery.length;
    const lightboxSrc = lightbox && lightboxLen > 0 ? lightboxGallery[Math.min(lightbox.index, lightboxLen - 1)] : null;

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

    useEffect(() => {
        if (!lightbox) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setLightbox(null);
                return;
            }

            if (lightboxLen < 2) return;

            if (e.key === "ArrowLeft") {
                setLightbox((prev) => {
                    if (!prev) return prev;
                    const nextIndex = (prev.index - 1 + lightboxLen) % lightboxLen;
                    return { ...prev, index: nextIndex };
                });
            }
            if (e.key === "ArrowRight") {
                setLightbox((prev) => {
                    if (!prev) return prev;
                    const nextIndex = (prev.index + 1) % lightboxLen;
                    return { ...prev, index: nextIndex };
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [lightbox, lightboxLen]);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#050505] transition-colors duration-300"
        >
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-slate-900 dark:text-white">Featured </span>
                        <span className="text-blue-500 dark:text-blue-400">Projects</span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        A showcase of my recent work, highlighting complex full-stack applications and AI integrations.
                    </p>
                </div>

                {/* Projects List */}
                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {/* Project Visuals - Conditional Layout */}
                            <div className={`w-full lg:w-1/2 flex justify-center perspective-1000 group ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                                <div className="relative w-full max-w-[600px] flex items-center justify-center">

                                    {project.layout === 'mobile-fan' && (
                                        <div className="relative w-full max-w-[500px] h-[450px] md:h-[550px] flex items-center justify-center">
                                            {/* Left Phone */}
                                            <div className="absolute left-1/2 top-1/2 w-[160px] md:w-[200px] aspect-[9/19] 
                                                transform -translate-x-[90%] -translate-y-1/2 rotate-y-12 -rotate-z-3 scale-90 z-0 
                                                transition-all duration-700 ease-out 
                                                group-hover:-translate-x-[110%] group-hover:rotate-y-20 group-hover:scale-95 group-hover:z-10">
                                                <PhoneFrame src={project.images.left} alt={`${project.title} Screen 1`} />
                                            </div>

                                            {/* Right Phone */}
                                            <div className="absolute left-1/2 top-1/2 w-[160px] md:w-[200px] aspect-[9/19] 
                                                transform -translate-x-[10%] -translate-y-1/2 -rotate-y-12 rotate-z-3 scale-90 z-0 
                                                transition-all duration-700 ease-out 
                                                group-hover:translate-x-[10%] group-hover:-rotate-y-20 group-hover:scale-95 group-hover:z-10">
                                                <PhoneFrame src={project.images.right} alt={`${project.title} Screen 2`} />
                                            </div>

                                            {/* Center Phone */}
                                            <div className="absolute left-1/2 top-1/2 w-[180px] md:w-[230px] aspect-[9/19] 
                                                transform -translate-x-1/2 -translate-y-1/2 z-20 
                                                transition-all duration-700 ease-out 
                                                group-hover:scale-105 group-hover:-translate-y-[55%] drop-shadow-2xl">
                                                {project.isMainImageFrameless ? (
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={project.images.main}
                                                            alt={`${project.title} Dashboard`}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                ) : (
                                                    <PhoneFrame src={project.images.main} alt={`${project.title} Dashboard`} />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {project.layout === 'desktop-mobile-hybrid' && (
                                        (() => {
                                            const desktopGallery = project.images.desktopGallery ?? (project.images.desktop ? [project.images.desktop] : []);
                                            const mobileGallery = project.images.mobileGallery ?? (project.images.mobile ? [project.images.mobile] : []);
                                            const selection = selectedScreens[project.title] ?? { desktop: 0, mobile: 0 };

                                            const activeDesktop = desktopGallery[Math.min(selection.desktop, Math.max(desktopGallery.length - 1, 0))] ?? project.images.desktop;
                                            const activeMobile = mobileGallery[Math.min(selection.mobile, Math.max(mobileGallery.length - 1, 0))] ?? project.images.mobile;

                                            return (
                                                <div className="w-full py-10 flex flex-col items-center justify-center">
                                                    <div className="relative w-full flex items-center justify-center">
                                                        {/* Desktop Screen (Back) */}
                                                        <button
                                                            type="button"
                                                            onClick={() => setLightbox({ projectTitle: project.title, kind: "desktop", index: selection.desktop })}
                                                            className="w-[90%] md:w-[95%] relative z-10 transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:-translate-x-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 rounded-xl"
                                                            aria-label={`Open ${project.title} desktop screenshots`}
                                                        >
                                                            <DesktopFrame src={activeDesktop} alt={`${project.title} Desktop`} />
                                                            <span className="sr-only">Open desktop screenshots</span>
                                                            <span className="absolute top-3 right-3 z-30 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                Click to zoom
                                                            </span>
                                                        </button>

                                                        {/* Mobile Screen (Front Overlap) */}
                                                        <button
                                                            type="button"
                                                            onClick={() => setLightbox({ projectTitle: project.title, kind: "mobile", index: selection.mobile })}
                                                            className="absolute right-0 -bottom-4 w-[100px] md:w-[140px] aspect-[9/19] z-20 transform rotate-3 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-0 group-hover:translate-x-2 group-hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 rounded-[2.5rem]"
                                                            aria-label={`Open ${project.title} mobile screenshots`}
                                                        >
                                                            <PhoneFrame src={activeMobile} alt={`${project.title} Mobile`} className="shadow-2xl" hideNotch={project.hideMobileNotch} />
                                                            <span className="sr-only">Open mobile screenshots</span>
                                                        </button>
                                                    </div>

                                                    {/* Screenshot Picker */}
                                                    {(desktopGallery.length > 1 || mobileGallery.length > 1) && (
                                                        <div className="w-full max-w-[520px] px-4 mt-6">
                                                            <div className="rounded-2xl bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 p-3 shadow-lg">
                                                                {/* Desktop thumbnails */}
                                                                {desktopGallery.length > 1 && (
                                                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                                                        {desktopGallery.map((src, i) => (
                                                                            <button
                                                                                key={`desktop-${i}`}
                                                                                type="button"
                                                                                onClick={() => setActiveScreen(project.title, "desktop", i)}
                                                                                className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all ${selection.desktop === i
                                                                                    ? "border-blue-500/60 ring-2 ring-blue-500/30"
                                                                                    : "border-slate-200/70 dark:border-white/10 hover:border-blue-500/40"
                                                                                    }`}
                                                                                aria-label={`Show desktop screenshot ${i + 1}`}
                                                                            >
                                                                                <Image src={src} alt={`${project.title} desktop screenshot ${i + 1}`} fill className="object-cover object-top" />
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {/* Mobile thumbnails */}
                                                                {mobileGallery.length > 1 && (
                                                                    <div className="grid grid-cols-3 gap-2">
                                                                        {mobileGallery.map((src, i) => (
                                                                            <button
                                                                                key={`mobile-${i}`}
                                                                                type="button"
                                                                                onClick={() => setActiveScreen(project.title, "mobile", i)}
                                                                                className={`relative aspect-[9/19] rounded-xl overflow-hidden border transition-all ${selection.mobile === i
                                                                                    ? "border-blue-500/60 ring-2 ring-blue-500/30"
                                                                                    : "border-slate-200/70 dark:border-white/10 hover:border-blue-500/40"
                                                                                    }`}
                                                                                aria-label={`Show mobile screenshot ${i + 1}`}
                                                                            >
                                                                                <Image src={src} alt={`${project.title} mobile screenshot ${i + 1}`} fill className="object-cover" />
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })()
                                    )}

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
                                    {project.links.github && (
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
                                    )}

                                    {project.links.site && (
                                        <a
                                            href={project.links.site}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-gray-100 transition-all active:scale-95"
                                        >
                                            <div className="w-5 h-5">
                                                <GlobeIcon />
                                            </div>
                                            <span>Visit Site</span>
                                        </a>
                                    )}

                                    {/* Case Study Button */}
                                    {project.links.caseStudy && (
                                        <Link
                                            href={project.links.caseStudy}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-900/20 dark:border-white/10 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-95"
                                        >
                                            <LinkIcon />
                                            <span>Case Study</span>
                                        </Link>
                                    )}

                                    {/* APK Download Button - Only show if apkDownload link exists and is not '#' */}
                                    {project.links.apkDownload && project.links.apkDownload !== '#' && (
                                        <a
                                            href={project.links.apkDownload}
                                            download
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
                                        >
                                            <DownloadIcon />
                                            <span>Download APK</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && lightboxSrc && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${lightbox.projectTitle} screenshots`}
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden bg-black/30 border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={lightboxSrc}
                            alt={`${lightbox.projectTitle} ${lightbox.kind} screenshot ${lightbox.index + 1}`}
                            fill
                            className="object-contain"
                            priority
                        />

                        {/* Top bar */}
                        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 bg-gradient-to-b from-black/70 to-transparent">
                            <div className="text-xs md:text-sm text-white/90">
                                <span className="font-semibold">{lightbox.projectTitle}</span>
                                <span className="text-white/60"> • </span>
                                <span className="capitalize text-white/70">{lightbox.kind}</span>
                                {lightboxLen > 0 && (
                                    <>
                                        <span className="text-white/60"> • </span>
                                        <span className="text-white/70">
                                            {Math.min(lightbox.index + 1, lightboxLen)} / {lightboxLen}
                                        </span>
                                    </>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => setLightbox(null)}
                                className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
                                aria-label="Close screenshots"
                            >
                                Close
                            </button>
                        </div>

                        {/* Navigation */}
                        {lightboxLen > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setLightbox((prev) => {
                                        if (!prev) return prev;
                                        const nextIndex = (prev.index - 1 + lightboxLen) % lightboxLen;
                                        return { ...prev, index: nextIndex };
                                    })}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                                    aria-label="Previous screenshot"
                                >
                                    <span className="text-xl leading-none">‹</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLightbox((prev) => {
                                        if (!prev) return prev;
                                        const nextIndex = (prev.index + 1) % lightboxLen;
                                        return { ...prev, index: nextIndex };
                                    })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                                    aria-label="Next screenshot"
                                >
                                    <span className="text-xl leading-none">›</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
