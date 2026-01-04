import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik_Wet_Paint } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";

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

const baseUrl = "https://samuelsurf.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Samuel Surf Portfolio | Full Stack Software Developer",
    template: "%s | Samuel Surf",
  },
  description: "Full Stack Software Developer specializing in Mobile Applications, Backend Development, and AI Integrations. Explore my projects and get in touch.",
  keywords: ["Full Stack Developer", "Mobile Development", "AI Integration", "Backend Development", "Flutter", "Next.js", "Software Engineer", "Samuel Ukpai", "Samuel Surf"],
  authors: [{ name: "Samuel Surf", url: baseUrl }],
  creator: "Samuel Surf",
  publisher: "Samuel Surf",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Samuel Surf Portfolio | Full Stack Software Developer",
    description: "Full Stack Software Developer specializing in Mobile Applications, Backend Development, and AI Integrations. Explore my projects and get in touch.",
    siteName: "Samuel Surf Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Samuel Surf - Full Stack Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Surf Portfolio | Full Stack Software Developer",
    description: "Full Stack Software Developer specializing in Mobile Applications, Backend Development, and AI Integrations. Explore my projects and get in touch.",
    images: ["/og-image.png"],
    creator: "@samthesurf",
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
};

// JSON-LD Structured Data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samuel Ukpai",
  alternateName: "Samuel Surf",
  url: baseUrl,
  image: `${baseUrl}/og-image.png`,
  jobTitle: "Full Stack Software Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  description: "Full Stack Software Developer specializing in Mobile Applications, Backend Development, and AI Integrations.",
  knowsAbout: [
    "Mobile Development",
    "Flutter",
    "Backend Development",
    "AI Integration",
    "Next.js",
    "TypeScript",
    "Python",
    "Cloud Services",
  ],
  sameAs: [
    "https://x.com/samthesurf",
    "https://linkedin.com/in/samuelsurf",
    "https://samuelsurf.medium.com",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubikWetPaint.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
