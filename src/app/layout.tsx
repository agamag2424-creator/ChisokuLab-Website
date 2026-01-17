import type { Metadata } from "next";
import { Inter, Source_Sans_3, Merriweather } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ChisokuLab - Calm Amid AI Chaos",
    template: "%s | ChisokuLab",
  },
  description:
    "AI efficiency training combined with Hindu decision science philosophy. Learn to make confident decisions in the age of AI with our comprehensive course.",
  keywords: [
    "AI training",
    "decision science",
    "Hindu philosophy",
    "AI efficiency",
    "leadership training",
    "enterprise AI",
  ],
  authors: [{ name: "ChisokuLab" }],
  creator: "ChisokuLab",
  publisher: "ChisokuLab",
  metadataBase: new URL("https://chisokulab.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chisokulab.com",
    siteName: "ChisokuLab",
    title: "ChisokuLab - Calm Amid AI Chaos",
    description:
      "AI efficiency training combined with Hindu decision science philosophy. Learn to make confident decisions in the age of AI.",
    images: [
      {
        url: "https://chisokulab.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ChisokuLab - Calm Amid AI Chaos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChisokuLab - Calm Amid AI Chaos",
    description:
      "AI efficiency training combined with Hindu decision science philosophy.",
    images: ["https://chisokulab.com/og-image.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceSans.variable} ${merriweather.variable} antialiased`}
      >
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-chisoku-cyan-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-chisoku-cyan-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
