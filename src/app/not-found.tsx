import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08080a] text-white flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="font-display text-8xl font-bold text-orange-500/20 mb-4">
          404
        </div>
        
        <h1 className="font-display text-2xl font-bold mb-3">
          Page not found
        </h1>
        
        <p className="text-white/60 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-full px-6 w-full">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          
          <Link href="/app">
            <Button
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 rounded-full px-6 w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Create Headshot
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
