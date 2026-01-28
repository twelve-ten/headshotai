import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for HeadshotAI. Read our terms and conditions for using our AI headshot generator.",
  alternates: {
    canonical: "https://headshotai.com/terms",
  },
};

export default function TermsPage() {
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
          <h1 className="font-display text-3xl font-semibold mb-8 text-slate-900">Terms of Service</h1>

          <p className="text-slate-500 mb-8">
            <em>Last updated: January 2026</em>
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              By using HeadshotAI, you agree to these terms. If you don&apos;t agree,
              please don&apos;t use our service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              2. Service Description
            </h2>
            <p className="text-slate-600 leading-relaxed">
              HeadshotAI uses artificial intelligence to transform your photos
              into professional headshots. Results may vary based on input image
              quality.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              3. Your Content
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-600">
              <li>
                You own all rights to photos you upload and headshots you
                generate.
              </li>
              <li>
                You confirm you have the right to use any photos you upload.
              </li>
              <li>
                You may use generated headshots for any personal or commercial
                purpose.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              4. Prohibited Uses
            </h2>
            <p className="text-slate-600 mb-4">You may not:</p>
            <ul className="list-disc pl-6 space-y-3 text-slate-600">
              <li>Upload photos of people without their consent</li>
              <li>Use the service for fraudulent or deceptive purposes</li>
              <li>Attempt to reverse engineer our AI systems</li>
              <li>Abuse, harass, or harm others using our service</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              5. Payments & Refunds
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-600">
              <li>Prices are displayed in USD and may change without notice.</li>
              <li>All payments are processed securely through Stripe.</li>
              <li>
                Refunds are available within 7 days if you&apos;re unsatisfied with
                results.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              6. Disclaimer
            </h2>
            <p className="text-slate-600 leading-relaxed">
              HeadshotAI is provided &ldquo;as is&rdquo; without warranties. We don&apos;t
              guarantee specific results. AI-generated images may not be perfect
              and should be reviewed before use.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              7. Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed">
              HeadshotAI is not liable for any indirect, incidental, or
              consequential damages arising from use of our service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              8. Changes to Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We may update these terms. Continued use after changes constitutes
              acceptance of new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-slate-900">9. Contact</h2>
            <p className="text-slate-600">
              Questions? Email us at{" "}
              <a
                href="mailto:legal@headshotai.com"
                className="text-blue-500 hover:text-blue-600"
              >
                legal@headshotai.com
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
