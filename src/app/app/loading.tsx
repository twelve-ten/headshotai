import { Loader2 } from "lucide-react";

export default function AppLoading() {
  return (
    <div className="min-h-screen bg-[#08080a] text-white">
      {/* Header Skeleton */}
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-4">
          <div className="w-12 h-4 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-px bg-white/20" />
          <div className="w-24 h-5 bg-white/10 rounded animate-pulse" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Step indicator skeleton */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
              <div className="w-16 h-4 bg-white/10 rounded animate-pulse" />
              {i < 3 && <div className="w-12 h-px bg-white/20" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload section skeleton */}
          <div>
            <div className="w-24 h-5 bg-white/10 rounded mb-4 animate-pulse" />
            <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-orange-500/50 animate-spin" />
            </div>
          </div>

          {/* Style section skeleton */}
          <div>
            <div className="w-28 h-5 bg-white/10 rounded mb-4 animate-pulse" />
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
                >
                  <div className="w-20 h-4 bg-white/10 rounded mb-2 animate-pulse" />
                  <div className="w-32 h-3 bg-white/5 rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="w-full h-12 rounded-xl bg-orange-500/30 animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
