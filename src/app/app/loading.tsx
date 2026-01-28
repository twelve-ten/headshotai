import { Loader2 } from "lucide-react";

export default function AppLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-4">
          <div className="w-12 h-4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-px bg-slate-200" />
          <div className="w-24 h-5 bg-slate-200 rounded animate-pulse" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Step indicator skeleton */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
              <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
              {i < 3 && <div className="w-12 h-px bg-slate-200" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload section skeleton */}
          <div>
            <div className="w-24 h-5 bg-slate-200 rounded mb-4 animate-pulse" />
            <div className="aspect-square rounded-xl bg-white border border-slate-200 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-500/50 animate-spin" />
            </div>
          </div>

          {/* Style section skeleton */}
          <div>
            <div className="w-28 h-5 bg-slate-200 rounded mb-4 animate-pulse" />
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-slate-200 bg-white"
                >
                  <div className="w-20 h-4 bg-slate-200 rounded mb-2 animate-pulse" />
                  <div className="w-32 h-3 bg-slate-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="w-full h-12 rounded-lg bg-slate-200 animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
