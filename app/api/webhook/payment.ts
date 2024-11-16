import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function handlePaymentWebhook(
  event: any
) {
 
  if (event.event === "charge.success") {
    const orderId = event.data.metadata.orderId as string;
    const paymentIntentId = event.data.id;
    const transaction_fee = event.data.fees / 100;

    const order = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        transaction_fee,
      },
    });

    if (order) {
      if (order.order_type === "create") {
        await db.event.update({
          where: {
            id: order.eventId,
          },
          data: {
            active: true,
            members: {
              update: {
                where: {
                  userId_eventId: {
                    userId: order.buyerId,
                    eventId: order.eventId,
                  },
                },
                data: {
                  paymentIntentId: paymentIntentId.toString(),
                },
              },
            },
          },
        });
      } else {
        await db.event.update({
          where: {
            id: order.eventId,
          },
          data: {
            members: {
              create: [
                {
                  userId: order?.buyerId as string,
                  paymentIntentId: paymentIntentId.toString(),
                },
              ],
            },
          },
        });
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
