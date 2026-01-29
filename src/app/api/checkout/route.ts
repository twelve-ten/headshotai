import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripe, CREDIT_PACKS, PackKey } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { pack } = await request.json();
    if (!pack || !CREDIT_PACKS[pack as PackKey]) {
      return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
    }

    const selectedPack = CREDIT_PACKS[pack as PackKey];
    if (!selectedPack.priceId) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: session.user.email,
      metadata: {
        pack,
        credits: selectedPack.credits.toString(),
        userId: (session.user as { id?: string }).id || "",
      },
      line_items: [
        {
          price: selectedPack.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL || "https://headshotai.app"}/app?purchased=${selectedPack.credits}`,
      cancel_url: `${process.env.NEXTAUTH_URL || "https://headshotai.app"}/app`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
