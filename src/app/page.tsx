import Link from "next/link";
import { ArrowRight, Check, Sparkles, Zap, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const beforeAfterExamples = [
  { before: "😐", after: "😎", label: "Job Seeker" },
  { before: "🤳", after: "💼", label: "Founder" },
  { before: "📱", after: "🎯", label: "Sales Rep" },
];

const features = [
  {
    icon: Zap,
    title: "60 Seconds",
    description: "Upload a selfie, get professional headshots instantly. No photoshoot needed.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Our AI enhances lighting, background, and composition like a pro photographer.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your photos are processed and deleted. We never store or train on your images.",
  },
];

const pricing = [
  {
    name: "Single",
    price: "$5",
    description: "One professional headshot",
    features: ["1 AI-generated headshot", "Multiple background options", "High-res download"],
    cta: "Get Headshot",
    popular: false,
  },
  {
    name: "Pro Pack",
    price: "$19",
    description: "10 variations to choose from",
    features: ["10 AI-generated headshots", "All backgrounds & styles", "High-res downloads", "Commercial license"],
    cta: "Get Pro Pack",
    popular: true,
  },
  {
    name: "Unlimited",
    price: "$29",
    period: "/month",
    description: "Unlimited headshots for your team",
    features: ["Unlimited headshots", "Priority processing", "Team accounts", "API access"],
    cta: "Go Unlimited",
    popular: false,
  },
];

const testimonials = [
  {
    quote: "Got more LinkedIn profile views in a week than I did all last year.",
    author: "Sarah K.",
    role: "Software Engineer",
    rating: 5,
  },
  {
    quote: "Used this for my whole team. Saved us thousands on a professional photoshoot.",
    author: "Mike R.",
    role: "Startup Founder",
    rating: 5,
  },
  {
    quote: "Finally a headshot I'm not embarrassed to put on my resume.",
    author: "David L.",
    role: "Job Seeker",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">
            Headshot<span className="text-orange-500">AI</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/app">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-black font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-400 mb-8">
            <Sparkles className="w-4 h-4" />
            Trusted by 10,000+ professionals
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Professional headshots
            <br />
            <span className="text-orange-500">without the photoshoot</span>
          </h1>
          
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
            Upload a selfie. Get studio-quality headshots in 60 seconds. 
            Perfect for LinkedIn, resumes, and your company website.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-lg px-8 gap-2">
                Create Your Headshot
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <span className="text-white/40 text-sm">Starting at $5 • No subscription required</span>
          </div>
        </div>
      </section>

      {/* Before/After Preview */}
      <section className="py-20 px-6 border-y border-white/5">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {beforeAfterExamples.map((example, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center text-4xl">
                    {example.before}
                  </div>
                  <ArrowRight className="w-6 h-6 text-orange-500" />
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 flex items-center justify-center text-4xl">
                    {example.after}
                  </div>
                </div>
                <span className="text-white/60 text-sm">{example.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Why professionals choose HeadshotAI</h2>
          <p className="text-white/50 text-center mb-16">No scheduling. No awkward poses. No expensive photographer.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/10 mb-5">
                  <feature.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/50">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-16">Loved by professionals everywhere</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-white/80 mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, transparent pricing</h2>
          <p className="text-white/50 text-center mb-16">Pay once, keep forever. No hidden fees.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <div 
                key={i} 
                className={`rounded-2xl border p-6 ${
                  plan.popular 
                    ? 'border-orange-500 bg-orange-500/5 relative' 
                    : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                  <p className="text-white/50 text-sm">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-white/50">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/app">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-orange-500 hover:bg-orange-600 text-black' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to upgrade your professional image?</h2>
          <p className="text-white/50 mb-8">Join thousands of professionals who&apos;ve ditched awkward photoshoots.</p>
          <Link href="/app">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-lg px-8 gap-2">
              Get Your Headshot Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="mx-auto max-w-6xl flex items-center justify-between text-sm text-white/40">
          <span>© 2026 HeadshotAI</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/60">Privacy</Link>
            <Link href="/terms" className="hover:text-white/60">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
