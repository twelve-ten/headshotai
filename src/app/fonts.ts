import { Syne, Outfit } from "next/font/google";

// Syne - distinctive display font with character
export const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Outfit - clean, modern body font
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
