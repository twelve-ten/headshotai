"use client";

import { Coins } from "lucide-react";

interface CreditsDisplayProps {
  credits: number;
  onClick?: () => void;
}

export function CreditsDisplay({ credits, onClick }: CreditsDisplayProps) {
  const isLow = credits <= 1;
  const isEmpty = credits === 0;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
        isEmpty
          ? "border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20"
          : isLow
          ? "border-orange-500/50 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
          : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
      }`}
    >
      <Coins className="w-4 h-4" />
      <span className="text-sm font-medium">
        {credits} credit{credits !== 1 ? "s" : ""}
      </span>
    </button>
  );
}
