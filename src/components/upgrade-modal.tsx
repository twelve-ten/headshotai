"use client";

import { X, Check, Zap, Crown, Sparkles } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 5,
    credits: 5,
    perCredit: 1,
    icon: Zap,
    popular: false,
    features: [
      "5 headshot generations",
      "All 4 styles",
      "High-resolution downloads",
      "Commercial usage rights",
    ],
  },
  {
    id: "pro",
    name: "Pro Pack",
    price: 15,
    credits: 20,
    perCredit: 0.75,
    icon: Sparkles,
    popular: true,
    features: [
      "20 headshot generations",
      "All 4 styles",
      "High-resolution downloads",
      "Commercial usage rights",
      "Priority processing",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 49,
    credits: 100,
    perCredit: 0.49,
    icon: Crown,
    popular: false,
    features: [
      "100 headshot generations",
      "All 4 styles",
      "High-resolution downloads",
      "Commercial usage rights",
      "Priority processing",
      "Bulk upload support",
    ],
  },
];

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  const handlePurchase = (planId: string) => {
    // TODO: Integrate Stripe checkout
    console.log("Purchase plan:", planId);
    alert(`Stripe integration coming soon!\n\nYou selected the ${planId} plan.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Header */}
        <div className="p-8 text-center border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Get More Credits
          </h2>
          <p className="text-slate-500 text-sm">
            Choose a plan to continue creating professional headshots.
          </p>
        </div>

        {/* Plans */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-xl border p-5 transition-all ${
                    plan.popular
                      ? "border-blue-500 bg-blue-50/50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
                      Popular
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        plan.popular ? "bg-blue-500" : "bg-slate-100"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          plan.popular ? "text-white" : "text-slate-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                      <p className="text-slate-500 text-sm">
                        {plan.credits} credits
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-semibold text-slate-900">
                        ${plan.price}
                      </span>
                      <span className="text-slate-400 text-sm">one-time</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1">
                      ${plan.perCredit.toFixed(2)} per headshot
                    </p>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(plan.id)}
                    className={`w-full h-10 rounded-lg font-medium transition-all text-sm ${
                      plan.popular
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    Buy Now
                  </button>
                </div>
              );
            })}
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex items-center justify-center gap-6 text-slate-400 text-sm">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure Payment
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Instant Delivery
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Powered by Stripe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
