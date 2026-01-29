import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { inter } from "./fonts";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://headshotai.com"),
  title: {
    default: "HeadshotAI - Professional Headshots",
    template: "%s | HeadshotAI",
  },
  description:
    "Transform any selfie into a professional headshot in under 2 minutes. No photographer needed.",
  keywords: [
    "AI headshot",
    "professional headshot",
    "LinkedIn photo",
    "profile picture",
    "AI portrait",
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
    title: "HeadshotAI - Professional Headshots",
    description:
      "Transform any selfie into a professional headshot in under 2 minutes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HeadshotAI - Professional Headshots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeadshotAI - Professional Headshots",
    description:
      "Transform any selfie into a professional headshot in under 2 minutes.",
    creator: "@headshotai",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://headshotai.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HeadshotAI",
  description: "AI-powered professional headshot generator",
  url: "https://headshotai.com",
  applicationCategory: "PhotographyApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "5.00",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://headshotai.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
