/**
 * Centralized site configuration — single source of truth for URLs, identity,
 * and entity metadata used across SEO/GEO surfaces (metadata, JSON-LD, sitemap,
 * robots, llms.txt, about page, etc.).
 *
 * Change this one file to migrate domains or update the public brand.
 */

export const SITE = {
  url: "https://samuelsurf.me",
  name: "Samuel Surf",
  legalName: "Samuel Ukpai",
  alternateNames: [
    "Samuel Ukpai",
    "Samuel Surf",
    "Samuel Surfboard",
    "Sam Surf",
    "Samuel Ukpai dev",
    "Samuel mobile",
    "Samuel web dev",
    "Samuel web",
    "Nasurf",
  ],
  email: "ukpsamuel67@gmail.com",
  jobTitle: "Full Stack Software Developer",
  jobTitleDetailed:
    "Full Stack Software Developer — Mobile, Web, Backend & AI Integrations",
  tagline: "Mobile Apps • Web Development • Backend • AI Integrations",
  shortDescription:
    "Full Stack Software Developer specializing in Flutter mobile apps, React/Next.js web applications, FastAPI/Python backends, and AI integrations with Google Gemini on Cloudflare's edge infrastructure.",
  longDescription:
    "Samuel Ukpai (a.k.a. Samuel Surf, Samuel Surfboard, Sam Surf, Nasurf) is a Full Stack Software Developer based in Nigeria. He builds production mobile apps with Flutter, modern web applications with React/Next.js/Vite, Python/FastAPI backends, and AI integrations using Google Gemini — typically deployed on Cloudflare's edge stack (Pages, Workers, D1, R2). His work spans personal products (Hawk Buddy, Engineering Hub) and client deliverables (Campus to Career — campustocareer.ng).",
  knowsAbout: [
    "Mobile Development",
    "Flutter",
    "Dart",
    "Web Development",
    "React",
    "Next.js",
    "Vite",
    "Backend Development",
    "FastAPI",
    "Python",
    "TypeScript",
    "AI Integration",
    "Google Gemini",
    "Cloudflare Edge",
    "Cloudflare Workers",
    "Cloudflare D1",
    "Cloudflare R2",
    "Firebase",
    "Google Cloud",
    "Oracle Cloud",
    "Docker",
    "Programmatic SEO",
  ],
  location: {
    country: "Nigeria",
    countryCode: "NG",
  },
  social: {
    github: "https://github.com/Samthesurf",
    twitter: "https://x.com/SamuelSurfboard",
    twitterHandle: "@SamuelSurfboard",
    linkedin: "https://www.linkedin.com/in/samuel-ukpai-641a3224a",
    medium: "https://samuelsurf.medium.com",
  },
  ogImage: "/og-image.png",
  projects: {
    hawkBuddy: {
      slug: "hawk-buddy",
      name: "Hawk Buddy",
      url: "/projects/hawk-buddy",
    },
    engineeringHub: {
      slug: "engineering-hub",
      name: "Engineering Hub",
      url: "/projects/engineering-hub",
    },
    campusCareer: {
      slug: "campus-career",
      name: "Campus to Career",
      url: "/projects/campus-career",
      liveUrl: "https://campustocareer.ng",
      repoUrl: "https://github.com/Samthesurf/Campus_Career",
    },
  },
} as const;

export type SiteConfig = typeof SITE;

export const absoluteUrl = (path = "/") => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
};
