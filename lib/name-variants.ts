/**
 * Programmatic SEO: name-variant landing pages.
 *
 * Each slug maps to a search term people might use to find Samuel.
 * The pages share the same visual layout but carry unique titles,
 * descriptions, and H1 content so search engines can index them
 * separately while canonical tags prevent duplicate-content issues.
 */

export interface NameVariant {
  slug: string;
  /** How the page heading addresses the visitor */
  displayName: string;
  /** <title> tag */
  title: string;
  /** meta description */
  description: string;
  /** Extra intro paragraph shown below the H1 */
  intro: string;
  /** Search queries this page targets */
  targetQueries: string[];
}

export const NAME_VARIANTS: NameVariant[] = [
  {
    slug: "samuel-ukpai",
    displayName: "Samuel Ukpai",
    title: "Samuel Ukpai | Full Stack Developer & Flutter Engineer",
    description:
      "Samuel Ukpai is a Full Stack Software Developer from Nigeria specializing in Flutter mobile apps, React/Next.js web applications, FastAPI backends, and AI integrations.",
    intro:
      "Samuel Ukpai (also known as Samuel Surf, Sam Surf, or Nasurf) is a Full Stack Software Developer building production mobile apps with Flutter, modern web applications with React/Next.js, and AI-powered backends deployed on Cloudflare's edge infrastructure.",
    targetQueries: [
      "samuel ukpai",
      "samuel ukpai developer",
      "samuel ukpai software engineer",
      "ukpai developer",
    ],
  },
  {
    slug: "sam-surf",
    displayName: "Sam Surf",
    title: "Sam Surf | Full Stack Developer & AI Engineer",
    description:
      "Sam Surf is a Full Stack Software Developer specializing in Flutter, React/Next.js, FastAPI, and AI integrations. View projects, skills, and contact info.",
    intro:
      "Sam Surf (Samuel Ukpai) is a Full Stack Software Developer from Nigeria. He builds mobile apps with Flutter, web platforms with React/Next.js, and AI-integrated backends with Python/FastAPI, deployed on Cloudflare Workers.",
    targetQueries: ["sam surf", "sam surf developer", "sam surf ai"],
  },
  {
    slug: "samuel-surfboard",
    displayName: "Samuel Surfboard",
    title: "Samuel Surfboard | Full Stack Developer Portfolio",
    description:
      "Samuel Surfboard's developer portfolio. Full Stack Software Developer building Flutter apps, Next.js web platforms, and AI-powered backends.",
    intro:
      "Samuel Surfboard (Samuel Ukpai) is a Full Stack Software Developer and the creator of Hawk Buddy, Engineering Hub, and Campus to Career. His stack spans Flutter, React/Next.js, FastAPI, and Google Gemini AI.",
    targetQueries: ["samuel surfboard", "surfboard developer", "samuel surfboard dev"],
  },
  {
    slug: "sam-surf-ai",
    displayName: "Sam Surf AI",
    title: "Sam Surf AI | AI Integration Developer & Full Stack Engineer",
    description:
      "Sam Surf AI - building intelligent applications with Google Gemini, LLM APIs, and AI-powered automation. Full Stack Developer specializing in AI integrations.",
    intro:
      "Sam Surf AI is the AI development work of Samuel Ukpai (Sam Surf). He integrates Google Gemini and other LLM APIs into mobile and web applications, building intelligent features like chatbots, content generation, and automated workflows on Cloudflare's edge infrastructure.",
    targetQueries: ["sam surf ai", "samuel surf ai developer", "sam surf artificial intelligence"],
  },
  {
    slug: "ukpai-dev",
    displayName: "Ukpai Dev",
    title: "Ukpai Dev | Full Stack Software Developer from Nigeria",
    description:
      "Ukpai Dev - Full Stack Software Developer from Nigeria. Flutter, React/Next.js, FastAPI, AI integrations. View portfolio and projects.",
    intro:
      "Ukpai Dev (Samuel Ukpai) is a Full Stack Software Developer based in Nigeria. He specializes in Flutter mobile development, React/Next.js web applications, Python/FastAPI backends, and AI integrations using Google Gemini.",
    targetQueries: ["ukpai dev", "ukpai developer", "ukpai software developer"],
  },
  {
    slug: "samuel-surf",
    displayName: "Samuel Surf",
    title: "Samuel Surf | Full Stack Developer & Flutter Engineer",
    description:
      "Samuel Surf's developer portfolio. Building mobile apps, web platforms, and AI-powered backends. Flutter, React/Next.js, FastAPI, Google Gemini.",
    intro:
      "Samuel Surf (Samuel Ukpai) is a Full Stack Software Developer from Nigeria. He builds production mobile apps with Flutter, modern web applications with React/Next.js, Python/FastAPI backends, and AI integrations with Google Gemini on Cloudflare's edge stack.",
    targetQueries: ["samuel surf", "samuel surf developer", "samuel surf portfolio"],
  },
  {
    slug: "nasurf",
    displayName: "Nasurf",
    title: "Nasurf | Full Stack Developer - Flutter, React, AI",
    description:
      "Nasurf (Samuel Ukpai) - Full Stack Developer specializing in Flutter mobile apps, React/Next.js web, FastAPI backends, and AI integrations.",
    intro:
      "Nasurf is the online handle of Samuel Ukpai, a Full Stack Software Developer from Nigeria. He builds mobile apps with Flutter, web platforms with React/Next.js, and AI-powered backends with Python/FastAPI, deployed on Cloudflare.",
    targetQueries: ["nasurf", "nasurf developer", "nasurf25"],
  },
];

/** Map slugs to variants for O(1) lookup */
export const VARIANT_MAP = new Map(
  NAME_VARIANTS.map((v) => [v.slug, v])
);
