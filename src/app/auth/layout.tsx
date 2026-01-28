import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | HeadshotAI",
  description: "Sign in to HeadshotAI to create professional headshots",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<AuthLoading />}>{children}</Suspense>;
}

function AuthLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
