import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <article className="prose prose-slate max-w-none">
          <h1 className="font-display text-3xl font-semibold mb-8 text-slate-900">Privacy Policy</h1>

          <p className="text-slate-500 mb-8">
            <em>Last updated: January 2026</em>
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              Our Commitment to Privacy
            </h2>
            <p className="text-slate-600 leading-relaxed">
              At HeadshotAI, we take your privacy seriously. This policy explains
              how we handle your data when you use our service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              Photo Processing
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-600">
              <li>
                <strong className="text-slate-900">No Storage:</strong> Your uploaded
                photos are processed in real-time and immediately deleted after
                generation.
              </li>
              <li>
                <strong className="text-slate-900">No Training:</strong> We never use
                your photos to train our AI models or any third-party systems.
              </li>
              <li>
                <strong className="text-slate-900">No Sharing:</strong> Your photos
                are never shared with third parties except for the AI processing
                service.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              Data We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-600">
              <li>
                <strong className="text-slate-900">Analytics:</strong> Anonymous usage
                data to improve our service (pages visited, features used).
              </li>
              <li>
                <strong className="text-slate-900">Payment Info:</strong> Processed
                securely by Stripe. We never see your full card details.
              </li>
              <li>
                <strong className="text-slate-900">Email:</strong> Only if you choose
                to subscribe to updates.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              Third-Party Services
            </h2>
            <p className="text-slate-600 mb-4">We use the following services:</p>
            <ul className="list-disc pl-6 space-y-3 text-slate-600">
              <li>
                <strong className="text-slate-900">Google (Gemini API):</strong> For
                AI image processing
              </li>
              <li>
                <strong className="text-slate-900">Vercel:</strong> For hosting and
                analytics
              </li>
              <li>
                <strong className="text-slate-900">Stripe:</strong> For payment
                processing
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              Your Rights
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Since we don&apos;t store your photos, there&apos;s nothing to delete. For
              any other data inquiries, contact us at privacy@headshotai.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-slate-900">Contact</h2>
            <p className="text-slate-600">
              Questions about privacy? Email us at{" "}
              <a
                href="mailto:privacy@headshotai.com"
                className="text-blue-500 hover:text-blue-600"
              >
                privacy@headshotai.com
              </a>
            </p>
          </section>
        </article>
      </main>

      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="mx-auto max-w-3xl text-sm text-slate-400">
          © 2026 HeadshotAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
