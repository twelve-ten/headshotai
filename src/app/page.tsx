"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How does it work?",
    a: "Upload any selfie, choose a style, and our AI transforms it into a professional headshot. The entire process takes under 2 minutes.",
  },
  {
    q: "Will it look natural?",
    a: "Yes. Our AI preserves your likeness while enhancing lighting, composition, and background. The result looks like you stepped out of a professional studio.",
  },
  {
    q: "What about privacy?",
    a: "Your photos are processed and immediately deleted. We never store, share, or train on your images.",
  },
  {
    q: "Can I use it for LinkedIn?",
    a: "Absolutely. These are real photos of you, professionally enhanced. Use them anywhere — LinkedIn, resumes, company websites.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0A0A0B]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-medium tracking-tight">
            HeadshotAI
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="#pricing"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link href="/app">
              <button className="h-9 px-4 text-sm font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="pt-40 pb-32 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.15] mb-6">
              Professional headshots,
              <br />
              <span className="text-white/40">without the photoshoot</span>
            </h1>

            <p className="text-lg text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
              Upload a selfie. Get a studio-quality headshot in under 2 minutes.
            </p>

            <Link href="/app">
              <button className="h-12 px-8 text-base font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-colors inline-flex items-center gap-2">
                Create your headshot
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <p className="mt-8 text-sm text-white/30">
              First one free · No account required
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-32 px-6 border-t border-white/[0.06]">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-medium text-center mb-20">
              How it works
            </h2>

            <div className="grid md:grid-cols-3 gap-16">
              {[
                {
                  step: "01",
                  title: "Upload",
                  desc: "Any selfie or casual photo. Phone quality is fine.",
                },
                {
                  step: "02",
                  title: "Choose style",
                  desc: "Corporate, creative, LinkedIn-optimized. Pick your look.",
                },
                {
                  step: "03",
                  title: "Download",
                  desc: "High-res PNG ready for professional use.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <div className="text-sm text-white/20 mb-4">{item.step}</div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="py-32 px-6 border-t border-white/[0.06]"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-medium text-center mb-4">Pricing</h2>
            <p className="text-center text-white/50 mb-16">
              Pay once, keep forever
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Single",
                  price: "$5",
                  desc: "1 headshot",
                  features: ["All styles", "High-res download", "Commercial use"],
                },
                {
                  name: "Pack",
                  price: "$19",
                  desc: "10 headshots",
                  features: [
                    "All styles",
                    "High-res downloads",
                    "Commercial use",
                    "Priority processing",
                  ],
                  popular: true,
                },
                {
                  name: "Team",
                  price: "$49",
                  desc: "50 headshots",
                  features: [
                    "All styles",
                    "High-res downloads",
                    "Commercial use",
                    "Priority processing",
                    "Bulk upload",
                  ],
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`p-6 rounded-xl border ${
                    plan.popular
                      ? "border-white/20 bg-white/[0.03]"
                      : "border-white/[0.06]"
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="font-medium mb-1">{plan.name}</h3>
                    <p className="text-sm text-white/40">{plan.desc}</p>
                  </div>

                  <div className="text-3xl font-medium mb-6">{plan.price}</div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-white/50 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="/app" className="block">
                    <button
                      className={`w-full h-10 rounded-lg text-sm font-medium transition-colors ${
                        plan.popular
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-white/[0.06] hover:bg-white/[0.1]"
                      }`}
                    >
                      Get started
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 px-6 border-t border-white/[0.06]">
          <div className="mx-auto max-w-xl">
            <h2 className="text-2xl font-medium text-center mb-16">
              Questions
            </h2>

            <div className="space-y-1">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/[0.06]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-5 text-left flex items-center justify-between hover:text-white/80 transition-colors"
                  >
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/30 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openFaq === i ? "max-h-32 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="text-white/50 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 border-t border-white/[0.06]">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-medium mb-4">Ready to upgrade your image?</h2>
            <p className="text-white/50 mb-10">
              Join thousands of professionals who trust HeadshotAI.
            </p>
            <Link href="/app">
              <button className="h-12 px-8 text-base font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-colors inline-flex items-center gap-2">
                Create your headshot
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl flex items-center justify-between text-sm text-white/30">
          <span>© 2026 HeadshotAI</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
