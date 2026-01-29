import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

// Credit packs - one-time purchases
export const CREDIT_PACKS = {
  starter: {
    name: "Starter Pack",
    credits: 10,
    price: 9,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || "",
    popular: false,
  },
  pro: {
    name: "Pro Pack",
    credits: 30,
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "",
    popular: true,
  },
  studio: {
    name: "Studio Pack",
    credits: 100,
    price: 49,
    priceId: process.env.STRIPE_STUDIO_PRICE_ID || "",
    popular: false,
  },
} as const;

export type PackKey = keyof typeof CREDIT_PACKS;
