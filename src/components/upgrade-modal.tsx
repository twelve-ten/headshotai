"use client";

import { X, Check } from "lucide-react";

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
    features: ["5 headshots", "All styles", "High-res downloads"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 15,
    credits: 20,
    popular: true,
    features: [
      "20 headshots",
      "All styles",
      "High-res downloads",
      "Priority processing",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 49,
    credits: 100,
    features: [
      "100 headshots",
      "All styles",
      "High-res downloads",
      "Priority processing",
      "Bulk upload",
    ],
  },
];

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  const handlePurchase = (planId: string) => {
    console.log("Purchase plan:", planId);
    alert(`Stripe integration coming soon!\n\nYou selected the ${planId} plan.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-[#0A0A0B] border border-white/[0.08] rounded-xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/[0.05] transition-colors z-10"
        >
          <X className="w-5 h-5 text-white/40" />
        </button>

        {/* Header */}
        <div className="p-8 pb-0">
          <h2 className="text-xl font-medium text-white mb-2">Get more credits</h2>
          <p className="text-white/40 text-sm">
            Choose a plan to continue creating headshots
          </p>
        </div>

        {/* Plans */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl border p-5 ${
                  plan.popular
                    ? "border-white/20 bg-white/[0.03]"
                    : "border-white/[0.06]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-white text-black text-xs font-medium">
                    Popular
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-medium text-white">{plan.name}</h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    {plan.credits} credits
                  </p>
                </div>

                <div className="mb-5">
                  <span className="text-2xl font-medium text-white">
                    ${plan.price}
                  </span>
                  <span className="text-white/30 text-sm ml-1">one-time</span>
                </div>

                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-white/50"
                    >
                      <Check className="w-3.5 h-3.5 text-white/30" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan.id)}
                  className={`w-full h-9 rounded-lg text-sm font-medium transition-colors ${
                    plan.popular
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-white/[0.06] text-white hover:bg-white/[0.1]"
                  }`}
                >
                  Buy now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
