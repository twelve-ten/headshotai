import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-xl font-medium text-white mb-2">Page not found</h1>
        <p className="text-white/40 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 px-6 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors items-center text-sm"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
