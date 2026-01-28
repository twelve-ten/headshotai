"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-xl font-medium text-white mb-2">
          Something went wrong
        </h1>
        <p className="text-white/40 text-sm mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="h-10 px-6 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors text-sm"
          >
            Try again
          </button>
          <Link
            href="/"
            className="h-10 px-6 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:border-white/15 transition-colors flex items-center text-sm"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
