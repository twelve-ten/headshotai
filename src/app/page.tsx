"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock, Shield, Sparkles, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// FAQ data with real objection handling
const faqs = [
  {
    q: "Will this actually look professional?",
    a: "Yes. Our AI is trained on thousands of professional studio headshots. The output matches what you'd get from a $300 photoshoot - clean background, perfect lighting, flattering angles.",
  },
  {
    q: "What if I don't like the result?",
    a: "Generate as many variations as you want until you're happy. Most people find their perfect headshot within 2-3 tries.",
  },
  {
    q: "Is my photo stored or used for training?",
    a: "No. Your photo is processed and immediately deleted. We never store, share, or train on your images. Privacy is non-negotiable.",
  },
  {
    q: "Can I use this for LinkedIn and job applications?",
    a: "Absolutely. These are real photos of you, professionally enhanced. They're yours to use anywhere - LinkedIn, resumes, company websites, business cards.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-hidden">
      {/* Grain overlay for texture */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Animated gradient orb */}
      <div className="fixed top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/20 via-red-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-[#08080a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="font-display text-xl font-bold tracking-tight">
            Headshot<span className="text-orange-400">AI</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm text-white/50 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/app">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-full px-5">
                Create Headshot
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Rhetorical question headline */}
      <section className="relative z-10 pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Social proof badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-2 text-sm mb-8 animate-fade-in">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-[#08080a]" />
              ))}
            </div>
            <span className="text-white/70">12,847 headshots created this week</span>
          </div>
          
          {/* Headline - Rhetorical question format */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="text-white/40">Tired of</span> awkward photoshoots
            <br />
            <span className="text-white/40">and</span>{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              bad LinkedIn photos?
            </span>
          </h1>
          
          {/* Subheadline - Specific benefit */}
          <p className="text-xl sm:text-2xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Upload a selfie. Get a{" "}
            <span className="text-white font-medium">studio-quality headshot</span>{" "}
            in under 2 minutes. No photographer, no scheduling, no $300 bill.
          </p>
          
          {/* CTA - Action verb + what they get */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/app">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-400 text-black font-bold text-lg px-8 h-14 rounded-full gap-2 shadow-[0_0_30px_rgba(251,146,60,0.3)] hover:shadow-[0_0_40px_rgba(251,146,60,0.4)] transition-all">
                Create Your Headshot Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          {/* Risk reversal */}
          <div className="flex items-center justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              First one free
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-400" />
              Ready in 2 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-400" />
              Photos never stored
            </span>
          </div>
        </div>
      </section>

      {/* Problem / Pain Section */}
      <section className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              The old way is <span className="text-red-400">broken</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { pain: "Professional photoshoots cost $200-500", icon: "💸" },
              { pain: "Scheduling takes weeks of back-and-forth", icon: "📅" },
              { pain: "Results depend on how you felt that day", icon: "😬" },
            ].map((item, i) => (
              <div 
                key={i} 
                className="text-center p-6 rounded-2xl border border-red-500/10 bg-red-500/5"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-white/70">{item.pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / How It Works */}
      <section className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              How HeadshotAI works
            </h2>
            <p className="text-white/50">Three steps. Two minutes. One perfect headshot.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "1", 
                title: "Upload any selfie", 
                desc: "Phone photo, webcam shot, whatever you have. Our AI handles the rest.",
                icon: "📸"
              },
              { 
                step: "2", 
                title: "Pick your style", 
                desc: "Corporate, creative, LinkedIn-optimized, or executive. Choose your vibe.",
                icon: "🎨"
              },
              { 
                step: "3", 
                title: "Download & use", 
                desc: "High-res PNG ready for LinkedIn, resumes, websites, business cards.",
                icon: "✨"
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-display font-bold text-orange-500/10 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative z-10 py-20 px-6 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-2">
              What people are saying
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Got more LinkedIn messages in one week than I did all last year. This headshot actually gets responses.",
                author: "Sarah K.",
                role: "Software Engineer @ Stripe",
                rating: 5,
              },
              {
                quote: "Saved $400 on a photographer. Used this for my entire team of 12. Everyone looks incredible.",
                author: "Marcus R.",
                role: "Founder, TechCo",
                rating: 5,
              },
              {
                quote: "I was skeptical but holy shit. My new headshot looks better than my actual professional photos.",
                author: "Jennifer L.",
                role: "Product Manager",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 text-sm leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-white/40">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Simple pricing. No subscriptions.
            </h2>
            <p className="text-white/50">Pay once, keep your headshots forever.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Single",
                price: "$5",
                description: "Try it out",
                features: ["1 professional headshot", "All style options", "High-res download"],
                popular: false,
              },
              {
                name: "Pro Pack",
                price: "$19",
                description: "Most popular",
                features: ["10 headshot variations", "All styles included", "High-res downloads", "Commercial license"],
                popular: true,
              },
              {
                name: "Team",
                price: "$49",
                description: "For companies",
                features: ["5 team members", "Unlimited headshots each", "Consistent brand style", "Priority support"],
                popular: false,
              },
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`relative p-6 rounded-2xl border ${
                  plan.popular 
                    ? 'border-orange-500/50 bg-orange-500/5' 
                    : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    Best Value
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm text-white/40">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                      <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/app">
                  <Button 
                    className={`w-full rounded-full ${
                      plan.popular 
                        ? 'bg-orange-500 hover:bg-orange-400 text-black font-semibold' 
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    Get {plan.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Objection Handling */}
      <section id="faq" className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Questions? Answered.
            </h2>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border border-white/5 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-white/60 text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Your LinkedIn photo is the first impression.
            <br />
            <span className="text-orange-400">Make it count.</span>
          </h2>
          <p className="text-white/50 mb-8">
            Join 12,000+ professionals who upgraded their image.
          </p>
          <Link href="/app">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-400 text-black font-bold text-lg px-10 h-14 rounded-full gap-2 shadow-[0_0_30px_rgba(251,146,60,0.3)]">
              Create Your Headshot Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/5">
        <div className="mx-auto max-w-6xl flex items-center justify-between text-sm text-white/30">
          <span>© 2026 HeadshotAI</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/50">Privacy</Link>
            <Link href="/terms" className="hover:text-white/50">Terms</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .font-display {
          font-family: var(--font-display), system-ui, sans-serif;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
