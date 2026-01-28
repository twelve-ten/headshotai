import { track } from "@vercel/analytics";

// Conversion funnel events
export const analytics = {
  // Top of funnel
  landingView: () => track("landing_view"),
  ctaClick: (location: string) => track("cta_click", { location }),
  
  // Middle of funnel
  appView: () => track("app_view"),
  imageUpload: () => track("image_upload"),
  styleSelect: (style: string) => track("style_select", { style }),
  
  // Bottom of funnel
  generateStart: () => track("generate_start"),
  generateComplete: () => track("generate_complete"),
  downloadClick: () => track("download_click"),
  
  // Revenue events
  pricingView: () => track("pricing_view"),
  checkoutStart: (plan: string) => track("checkout_start", { plan }),
  purchaseComplete: (plan: string, amount: number) => 
    track("purchase_complete", { plan, amount }),
};

// Helper to track conversion rates
export const funnelSteps = [
  "landing_view",
  "cta_click", 
  "app_view",
  "image_upload",
  "generate_start",
  "generate_complete",
  "download_click",
  "checkout_start",
  "purchase_complete",
] as const;
