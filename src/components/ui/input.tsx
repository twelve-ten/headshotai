import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "w-full h-10 px-4 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 text-sm transition-colors outline-none",
        "focus:border-white/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
