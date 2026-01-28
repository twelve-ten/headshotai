import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Headshot",
  description:
    "Upload your selfie and transform it into a professional headshot in seconds. Choose from corporate, LinkedIn, creative, or executive styles.",
  openGraph: {
    title: "Create Your Professional Headshot | HeadshotAI",
    description:
      "Upload a selfie, choose your style, and get a studio-quality headshot in under 2 minutes.",
    url: "https://headshotai.com/app",
  },
  twitter: {
    title: "Create Your Professional Headshot | HeadshotAI",
    description:
      "Upload a selfie, choose your style, and get a studio-quality headshot in under 2 minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://headshotai.com/app",
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
