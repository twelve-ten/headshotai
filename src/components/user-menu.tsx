"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { User, LogOut, CreditCard, Settings } from "lucide-react";

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
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="w-8 h-8 rounded-full border border-slate-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-500" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-lg overflow-hidden z-50">
          {/* User info */}
          <div className="p-4 border-b border-slate-100">
            <p className="font-medium text-slate-900 truncate">
              {user.name || "User"}
            </p>
            <p className="text-sm text-slate-500 truncate">{user.email}</p>
          </div>

          {/* Menu items */}
          <div className="p-2">
            <button
              onClick={() => {
                setIsOpen(false);
                // TODO: Open billing/upgrade modal
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-sm">Buy Credits</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                // TODO: Navigate to settings
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>

          {/* Sign out */}
          <div className="p-2 border-t border-slate-100">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
