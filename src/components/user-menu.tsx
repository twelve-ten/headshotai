"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { User, LogOut, CreditCard } from "lucide-react";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full overflow-hidden border border-white/[0.08] hover:border-white/20 transition-colors"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white/[0.05] flex items-center justify-center">
            <User className="w-4 h-4 text-white/40" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-[#111113] border border-white/[0.08] shadow-xl overflow-hidden z-50">
          {/* User info */}
          <div className="p-4 border-b border-white/[0.06]">
            <p className="font-medium text-white text-sm truncate">
              {user.name || "User"}
            </p>
            <p className="text-xs text-white/40 truncate mt-0.5">
              {user.email}
            </p>
          </div>

          {/* Menu items */}
          <div className="p-1.5">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/[0.05] text-white/60 hover:text-white transition-colors text-sm"
            >
              <CreditCard className="w-4 h-4" />
              Buy Credits
            </button>
          </div>

          {/* Sign out */}
          <div className="p-1.5 border-t border-white/[0.06]">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
