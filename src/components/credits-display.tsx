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
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : isLow
          ? "border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Coins className="w-4 h-4" />
      <span className="text-sm font-medium">
        {credits} credit{credits !== 1 ? "s" : ""}
      </span>
    </button>
  );
}
