import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik_Wet_Paint } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";
import { SITE } from "../lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubikWetPaint = Rubik_Wet_Paint({
  variable: "--font-rubik-wet-paint",
  subsets: ["latin"],
  weight: "400",
});

const siteTitle = `${SITE.name} Portfolio | ${SITE.jobTitle}`;
const siteDescription = SITE.shortDescription;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: siteTitle,
    template: `%s | ${SITE.name}`,
  },
  description: siteDescription,
  keywords: [
    ...SITE.alternateNames,
    "Full Stack Developer",
    "Mobile Development",
    "Web Development",
    "React Developer",
    "Next.js Developer",
    "Flutter Developer",
    "Backend Development",
    "AI Integration",
    "Cloudflare Edge",
    "Software Engineer",
    "Freelance Developer",
    "Nigeria Developer",
    "Hawk Buddy",
    "Engineering Hub",
    "Campus to Career",
    "campustocareer.ng",
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  applicationName: `${SITE.name} Portfolio`,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: siteTitle,
    description: siteDescription,
    siteName: `${SITE.name} Portfolio`,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [SITE.ogImage],
    creator: SITE.social.twitterHandle,
    site: SITE.social.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION
        ? {
            "yandex-verification":
              process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION,
          }
        : {}),
    },
  },
};

// Single @graph JSON-LD with cross-linked entities so search engines + LLMs can
// triangulate every name variant to one canonical identity.
const personId = `${SITE.url}/#person`;
const websiteId = `${SITE.url}/#website`;
const profilePageId = `${SITE.url}/#profilepage`;
const organizationId = `${SITE.url}/#organization`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE.legalName,
      alternateName: SITE.alternateNames.filter((n) => n !== SITE.legalName),
      givenName: "Samuel",
      familyName: "Ukpai",
      url: SITE.url,
      image: {
        "@type": "ImageObject",
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1200,
        height: 630,
      },
      jobTitle: SITE.jobTitle,
      description: SITE.longDescription,
      email: `mailto:${SITE.email}`,
      knowsAbout: SITE.knowsAbout,
      knowsLanguage: ["English"],
      nationality: {
        "@type": "Country",
        name: SITE.location.country,
      },
      worksFor: {
        "@type": "Organization",
        "@id": organizationId,
        name: `${SITE.name} Studio`,
        url: SITE.url,
      },
      hasOccupation: {
        "@type": "Occupation",
        name: SITE.jobTitle,
        occupationalCategory: "15-1252.00",
        skills: SITE.knowsAbout.join(", "),
      },
      sameAs: [
        SITE.social.github,
        SITE.social.twitter,
        SITE.social.linkedin,
        SITE.social.medium,
      ],
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: `${SITE.name} Studio`,
      url: SITE.url,
      founder: { "@id": personId },
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/icon.svg`,
      },
      sameAs: [
        SITE.social.github,
        SITE.social.twitter,
        SITE.social.linkedin,
        SITE.social.medium,
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE.url,
      name: `${SITE.name} Portfolio`,
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": personId },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.url}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: SITE.url,
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
    },
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} Blog`}
          href="https://samuelsurf.medium.com/feed"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubikWetPaint.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
