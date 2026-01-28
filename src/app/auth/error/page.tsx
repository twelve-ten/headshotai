"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <Link href="/" className="inline-block mb-8">
          <span className="text-2xl font-semibold text-slate-900">
            HeadshotAI
          </span>
        </Link>

        {/* Error card */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>
          
          <h1 className="text-lg font-semibold text-slate-900 mb-2">
            Authentication Error
          </h1>
          
          <p className="text-slate-500 text-sm mb-6">
            {message}
          </p>

          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full h-11 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center justify-center transition-all"
            >
              Try Again
            </Link>
            
            <Link
              href="/"
              className="block w-full h-11 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium flex items-center justify-center transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
