import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site-config";
import { VARIANT_MAP, NAME_VARIANTS } from "@/lib/name-variants";
import HeaderNav from "@/components/HeaderNav";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render all known name variants at build time */
export function generateStaticParams() {
  return NAME_VARIANTS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const variant = VARIANT_MAP.get(slug);
  if (!variant) return {};

  const canonical = `${SITE.url}/${variant.slug}`;

  return {
    title: variant.title,
    description: variant.description,
    keywords: [
      ...variant.targetQueries,
      ...SITE.alternateNames,
      "Full Stack Developer",
      "Flutter Developer",
      "Software Engineer",
      "Nigeria Developer",
    ],
    authors: [{ name: SITE.legalName, url: SITE.url }],
    alternates: {
      canonical,
    },
    openGraph: {
      type: "profile",
      title: variant.title,
      description: variant.description,
      url: canonical,
      siteName: `${SITE.name} Portfolio`,
      images: [
        {
          url: SITE.ogImage,
          width: 1200,
          height: 630,
          alt: `${variant.displayName} — Full Stack Developer`,
        },
      ],
      firstName: "Samuel",
      lastName: "Ukpai",
      username: variant.displayName.toLowerCase().replace(/\s+/g, ""),
    },
    twitter: {
      card: "summary_large_image",
      title: variant.title,
      description: variant.description,
      images: [SITE.ogImage],
      creator: SITE.social.twitterHandle,
      site: SITE.social.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function NameVariantPage({ params }: PageProps) {
  const { slug } = await params;
  const variant = VARIANT_MAP.get(slug);
  if (!variant) notFound();

  const personId = `${SITE.url}/#person`;
  const canonical = `${SITE.url}/${variant.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.legalName,
        alternateName: SITE.alternateNames.filter((n) => n !== SITE.legalName),
        url: SITE.url,
        jobTitle: SITE.jobTitle,
        description: variant.description,
        image: `${SITE.url}${SITE.ogImage}`,
        sameAs: [
          SITE.social.github,
          SITE.social.twitter,
          SITE.social.linkedin,
          SITE.social.medium,
        ],
      },
      {
        "@type": "WebPage",
        url: canonical,
        name: variant.title,
        description: variant.description,
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          url: SITE.url,
          name: `${SITE.name} Portfolio`,
        },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white dark:bg-[#030303] text-slate-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden transition-colors duration-300">
        <HeaderNav />

        {/* Hero section tailored for this name variant */}
        <main className="relative flex min-h-[calc(100vh-88px)] items-center justify-center pt-28 pb-16 sm:pt-32 lg:min-h-[calc(100vh-100px)]">
          <div className="container mx-auto px-5 sm:px-6 md:px-12 lg:px-24 relative z-10 max-w-4xl text-center">
            <p className="text-blue-500 dark:text-blue-400 text-lg sm:text-xl font-medium mb-4">
              Also known as Samuel Surf, Sam Surf, Nasurf
            </p>
            <h1 className="text-[clamp(2.2rem,8vw,4rem)] md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              {variant.displayName}
            </h1>
            <p className="text-blue-500 dark:text-blue-400 text-base sm:text-lg font-medium mb-4">
              {SITE.tagline}
            </p>
            <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              {variant.intro}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5">
              <Link
                href="/"
                className="rounded-full bg-slate-900 px-6 py-3 text-center text-base font-bold text-white shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-colors hover:bg-slate-700 sm:px-8 sm:py-4 sm:text-lg dark:bg-white dark:text-black dark:shadow-[0_0_10px_rgba(255,255,255,0.2)] dark:hover:bg-gray-200"
              >
                View full portfolio
              </Link>
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 rounded-full border border-slate-900 px-6 py-3 text-base font-semibold text-slate-900 backdrop-blur-sm transition-all hover:border-slate-900 hover:bg-slate-100 active:scale-95 sm:px-8 sm:py-4 sm:text-lg dark:border-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/5"
              >
                Contact me
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
          </div>
        </main>

        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </div>
    </>
  );
}
