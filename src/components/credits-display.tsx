"use client";

interface CreditsDisplayProps {
  credits: number;
  onClick?: () => void;
}

export function CreditsDisplay({ credits, onClick }: CreditsDisplayProps) {
  const isEmpty = credits === 0;
  const isLow = credits <= 1;

  return (
    <button
      onClick={onClick}
      className={`h-8 px-3 rounded-lg border text-sm font-medium transition-colors ${
        isEmpty
          ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
          : isLow
          ? "border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
          : "border-white/[0.08] text-white/60 hover:text-white hover:border-white/15"
      }`}
    >
      {credits} credit{credits !== 1 ? "s" : ""}
    </button>
  );
}
