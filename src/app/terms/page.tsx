import { Metadata } from "next";
import Link from "next/link";

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
        <h1 className="text-2xl font-medium text-white mb-2">Terms of Service</h1>
        <p className="text-white/30 text-sm mb-12">Last updated: January 2026</p>

        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-white/50 leading-relaxed">
              By using HeadshotAI, you agree to these terms. If you don&apos;t agree,
              please don&apos;t use our service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              2. Service Description
            </h2>
            <p className="text-white/50 leading-relaxed">
              HeadshotAI uses artificial intelligence to transform your photos
              into professional headshots. Results may vary based on input image
              quality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              3. Your Content
            </h2>
            <ul className="space-y-3 text-white/50">
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  You own all rights to photos you upload and headshots you
                  generate.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  You confirm you have the right to use any photos you upload.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  You may use generated headshots for any personal or commercial
                  purpose.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              4. Prohibited Uses
            </h2>
            <ul className="space-y-3 text-white/50">
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>Upload photos of people without their consent</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>Use the service for fraudulent or deceptive purposes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>Attempt to reverse engineer our AI systems</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              5. Payments & Refunds
            </h2>
            <ul className="space-y-3 text-white/50">
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>Prices are displayed in USD and may change without notice.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>All payments are processed securely through Stripe.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/20">—</span>
                <span>
                  Refunds are available within 7 days if you&apos;re unsatisfied.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">
              6. Disclaimer
            </h2>
            <p className="text-white/50 leading-relaxed">
              HeadshotAI is provided &ldquo;as is&rdquo; without warranties. We don&apos;t
              guarantee specific results. AI-generated images may not be perfect
              and should be reviewed before use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-4">Contact</h2>
            <p className="text-white/50">
              Questions? Email us at{" "}
              <a
                href="mailto:legal@headshotai.com"
                className="text-white/70 hover:text-white transition-colors"
              >
                legal@headshotai.com
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
