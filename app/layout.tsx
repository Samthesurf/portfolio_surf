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



export const metadata: Metadata = {
  title: "Samuel Surf Portfolio",
  description: "Full Stack Software Developer specializing in Mobile Applications, Backend Development, and AI Integrations. Explore my projects and get in touch.",
  keywords: ["Full Stack Developer", "Mobile Development", "AI Integration", "Backend Development", "Flutter", "Next.js"],
  authors: [{ name: "Samuel Surf" }],
  creator: "Samuel Surf",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samuelsurf.vercel.app",
    title: "Samuel Surf Portfolio",
    description: "Full Stack Software Developer specializing in Mobile Applications, Backend Development, and AI Integrations. Explore my projects and get in touch.",
    siteName: "Samuel Surf Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Surf Portfolio",
    description: "Full Stack Software Developer specializing in Mobile Applications, Backend Development, and AI Integrations. Explore my projects and get in touch.",
  },
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
