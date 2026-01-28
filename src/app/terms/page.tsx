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
    <div className="min-h-screen bg-[#08080a] text-white">
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <article className="prose prose-invert prose-orange max-w-none">
          <h1 className="font-display text-3xl font-bold mb-8">Terms of Service</h1>

          <p className="text-white/70 mb-6">
            <em>Last updated: January 2026</em>
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              1. Acceptance of Terms
            </h2>
            <p className="text-white/70">
              By using HeadshotAI, you agree to these terms. If you don&apos;t agree,
              please don&apos;t use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              2. Service Description
            </h2>
            <p className="text-white/70">
              HeadshotAI uses artificial intelligence to transform your photos
              into professional headshots. Results may vary based on input image
              quality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              3. Your Content
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
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

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              4. Prohibited Uses
            </h2>
            <p className="text-white/70 mb-4">You may not:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Upload photos of people without their consent</li>
              <li>Use the service for fraudulent or deceptive purposes</li>
              <li>Attempt to reverse engineer our AI systems</li>
              <li>Abuse, harass, or harm others using our service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              5. Payments & Refunds
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Prices are displayed in USD and may change without notice.</li>
              <li>All payments are processed securely through Stripe.</li>
              <li>
                Refunds are available within 7 days if you&apos;re unsatisfied with
                results.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              6. Disclaimer
            </h2>
            <p className="text-white/70">
              HeadshotAI is provided &ldquo;as is&rdquo; without warranties. We don&apos;t
              guarantee specific results. AI-generated images may not be perfect
              and should be reviewed before use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              7. Limitation of Liability
            </h2>
            <p className="text-white/70">
              HeadshotAI is not liable for any indirect, incidental, or
              consequential damages arising from use of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              8. Changes to Terms
            </h2>
            <p className="text-white/70">
              We may update these terms. Continued use after changes constitutes
              acceptance of new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">9. Contact</h2>
            <p className="text-white/70">
              Questions? Email us at{" "}
              <a
                href="mailto:legal@headshotai.com"
                className="text-orange-400 hover:text-orange-300"
              >
                legal@headshotai.com
              </a>
            </p>
          </section>
        </article>
      </main>

      <footer className="border-t border-white/5 py-8 px-6">
        <div className="mx-auto max-w-3xl text-sm text-white/30">
          © 2026 HeadshotAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
