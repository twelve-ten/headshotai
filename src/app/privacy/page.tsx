import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how HeadshotAI handles your data. We never store or share your photos.",
  alternates: {
    canonical: "https://headshotai.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center">
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-medium text-white mb-2">Privacy Policy</h1>
        <p className="text-white/30 text-sm mb-12">Last updated: January 2026</p>

        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              Our Commitment
            </h2>
            <p className="text-white/50 leading-relaxed">
              At HeadshotAI, we take your privacy seriously. This policy explains
              how we handle your data when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              Photo Processing
            </h2>
            <ul className="space-y-3 text-white/50">
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  <strong className="text-white/70">No Storage:</strong> Your
                  uploaded photos are processed in real-time and immediately
                  deleted after generation.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  <strong className="text-white/70">No Training:</strong> We never
                  use your photos to train our AI models or any third-party
                  systems.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  <strong className="text-white/70">No Sharing:</strong> Your
                  photos are never shared with third parties except for the AI
                  processing service.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              Data We Collect
            </h2>
            <ul className="space-y-3 text-white/50">
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  <strong className="text-white/70">Analytics:</strong> Anonymous
                  usage data to improve our service.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  <strong className="text-white/70">Payment Info:</strong>{" "}
                  Processed securely by Stripe. We never see your card details.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  <strong className="text-white/70">Email:</strong> Only if you
                  create an account.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              Third-Party Services
            </h2>
            <ul className="space-y-3 text-white/50">
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>Google (Gemini API) for AI image processing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>Vercel for hosting and analytics</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>Stripe for payment processing</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">Contact</h2>
            <p className="text-white/50">
              Questions about privacy? Email us at{" "}
              <a
                href="mailto:privacy@headshotai.com"
                className="text-white/70 hover:text-white transition-colors"
              >
                privacy@headshotai.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="mx-auto max-w-3xl text-sm text-white/30">
          © 2026 HeadshotAI
        </div>
      </footer>
    </div>
  );
}
