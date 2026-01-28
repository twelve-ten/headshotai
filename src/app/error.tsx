"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border border-red-200 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h1 className="font-display text-2xl font-semibold mb-3 text-slate-900">
          Something went wrong
        </h1>
        
        <p className="text-slate-500 mb-8">
          We encountered an unexpected error. This has been logged and we&apos;ll look into it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Link href="/">
            <Button
              variant="outline"
              className="border-slate-200 bg-white hover:bg-slate-50 rounded-lg px-6 w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
        
        {error.digest && (
          <p className="text-slate-400 text-xs mt-6">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
