import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { handlePaymentWebhook } from "./payment";
import { handleWithdrawalWebhook } from "./withdrawal";

// Secret key for verifying webhook signatures
const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

export async function POST(req: NextRequest) {
  // Read the raw body for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  // Verify the signature
  const hash = crypto
    .createHmac("sha512", SECRET_KEY)
    .update(rawBody)
    .digest("hex");
  if (hash !== signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  // Parse the webhook body
  const event = JSON.parse(rawBody);
  const eventType = event.event; // This assumes the event structure includes an "event" field

  console.log(eventType);
  // Handle the webhook based on the event type
  switch (eventType) {
    case "charge.success":
      return handlePaymentWebhook(event);
    case "transfer.success":
      return handleWithdrawalWebhook(event);
    case "refund.processed":
      return NextResponse.json({ message: "Acknowledge" }, { status: 200 });
    default:
      return NextResponse.json(
        { message: "Unhandled event type" },
        { status: 400 }
      );
  }
}
