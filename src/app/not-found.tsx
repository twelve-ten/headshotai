import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="font-display text-8xl font-semibold text-slate-200 mb-4">
          404
        </div>
        
        <h1 className="font-display text-2xl font-semibold mb-3 text-slate-900">
          Page not found
        </h1>
        
        <p className="text-slate-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 w-full">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          
          <Link href="/app">
            <Button
              variant="outline"
              className="border-slate-200 bg-white hover:bg-slate-50 rounded-lg px-6 w-full"
            >
              Create Headshot
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
