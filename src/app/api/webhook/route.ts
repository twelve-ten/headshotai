import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { addCredits } from "@/lib/credits";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const credits = parseInt(session.metadata?.credits || "0", 10);

      if (userId && credits > 0) {
        await addCredits(userId, credits);
        console.log(`Added ${credits} credits to user ${userId}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }
}
