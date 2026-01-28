import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { syne, outfit } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeadshotAI - Professional Headshots Without the Photoshoot",
  description: "Tired of awkward photoshoots? Get studio-quality professional headshots in under 2 minutes. No photographer, no scheduling, no $300 bill.",
  keywords: "AI headshot, professional headshot, LinkedIn photo, profile picture, headshot generator",
  openGraph: {
    title: "HeadshotAI - Professional Headshots Without the Photoshoot",
    description: "Upload a selfie. Get a studio-quality headshot in under 2 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${outfit.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
