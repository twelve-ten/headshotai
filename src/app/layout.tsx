import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { syne, outfit } from "./fonts";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://headshotai.com"),
  title: {
    default: "HeadshotAI - Professional Headshots in 2 Minutes",
    template: "%s | HeadshotAI",
  },
  description:
    "Turn any selfie into a studio-quality professional headshot. No photographer needed. Perfect for LinkedIn, resumes & websites. Try free.",
  keywords: [
    "AI headshot",
    "professional headshot",
    "LinkedIn photo",
    "profile picture generator",
    "AI portrait",
    "headshot generator",
    "professional photo AI",
  ],
  authors: [{ name: "HeadshotAI" }],
  creator: "HeadshotAI",
  publisher: "HeadshotAI",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://headshotai.com",
    siteName: "HeadshotAI",
    title: "HeadshotAI - Professional Headshots in 2 Minutes",
    description:
      "Turn any selfie into a studio-quality professional headshot. No photographer needed.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeadshotAI - Professional Headshots in 2 Minutes",
    description:
      "Turn any selfie into a studio-quality professional headshot. No photographer needed.",
    creator: "@headshotai",
  },
  alternates: {
    canonical: "https://headshotai.com",
  },
  category: "Technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HeadshotAI",
  description:
    "AI-powered tool that transforms selfies into professional headshots in minutes",
  url: "https://headshotai.com",
  applicationCategory: "PhotographyApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "5.00",
    priceCurrency: "USD",
    priceValidUntil: "2026-12-31",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2847",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://headshotai.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${outfit.variable} font-body antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
