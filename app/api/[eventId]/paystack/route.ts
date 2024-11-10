import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  const { userId } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const event = await db.event.findFirst({
    where: {
      id: params?.eventId as string,
    },
  });

  const user = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (!event && !user) {
    return NextResponse.json(
      { url: `${process.env.NEXT_PUBLIC_APP_URL}/events` },
      {
        headers: corsHeaders,
      }
    );
  }

  const order_type = event?.active ? "join" : "create";

  const order = await db.order.create({
    data: {
      eventTitle: event?.title,
      eventId: event?.id!,
      price: Number(event?.price),
      buyerId: userId,
      order_type: order_type,
    },
  });

  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(event?.price) * 100,
        email: user?.email,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/events/callback?eventId=${params?.eventId}`,
        metadata: {
          orderId: order?.id,
        },
        currency: "NGN",
      }),
    }
  );

  const data = await response.json();
  const authorizationUrl = data.data.authorization_url;

  return NextResponse.json(
    { authorization_url: authorizationUrl },
    {
      headers: corsHeaders,
    }
  );
}
