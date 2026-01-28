import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeadshotAI - Professional AI Headshots Without the Photoshoot",
  description: "Get studio-quality professional headshots in 60 seconds. Perfect for LinkedIn, resumes, and company websites. No photoshoot needed.",
  keywords: "AI headshot, professional headshot, LinkedIn photo, profile picture, headshot generator",
  openGraph: {
    title: "HeadshotAI - Professional AI Headshots",
    description: "Get studio-quality professional headshots in 60 seconds.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
