"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Sparkles } from "lucide-react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: "There's a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link has expired or already been used.",
    OAuthSignin: "Error in the OAuth sign-in flow.",
    OAuthCallback: "Error in the OAuth callback.",
    OAuthCreateAccount: "Could not create OAuth provider user.",
    EmailCreateAccount: "Could not create email provider user.",
    Callback: "Error in the OAuth callback handler.",
    OAuthAccountNotLinked: "This email is already associated with another account.",
    EmailSignin: "Error sending the email verification link.",
    CredentialsSignin: "Invalid email or password.",
    SessionRequired: "Please sign in to access this page.",
    Default: "An error occurred during authentication.",
  };

  const message = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold text-white">
            Headshot<span className="text-orange-400">AI</span>
          </span>
        </Link>

        {/* Error card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          
          <h1 className="text-xl font-semibold text-white mb-2">
            Authentication Error
          </h1>
          
          <p className="text-white/60 mb-6">
            {message}
          </p>

          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold flex items-center justify-center transition-all"
            >
              Try Again
            </Link>
            
            <Link
              href="/"
              className="block w-full h-12 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-medium flex items-center justify-center transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
