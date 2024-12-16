import cron from "node-cron";
import { Member } from "@prisma/client";

import { db } from "@/lib/db";
import {
  sendAbsentMembersEmail,
  sendPresentMembersEmail,
  sendEventNotificationEmail,
} from "@/lib/mail";

// Send event notification email day(s) prior to the event
cron.schedule("0 0 * * *", async () => {
  // Run daily at midnight
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const in2days = new Date(today.setDate(today.getDate() + 2));
  const in3days = new Date(today.setDate(today.getDate() + 3));
  const in7days = new Date(today.setDate(today.getDate() + 7));

  const upcomingEvents = await db.event.findMany({
    where: {
      eventDate: tomorrow || in2days || in3days || in7days,
      active: true,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  upcomingEvents.forEach((event) => {
    // Retrieve member emails for each event
    event.members.forEach((member) => {
      const email = member.user.email as string;

      // Send notification to each member
      sendEventNotificationEmail(email, event);
    });
  });
});

const scheduleEndOfEventDayTask = (eventDate: string, event: any) => {
  // Set the task to run at midnight at the end of the specified date
  // Parse the specified date and check if it's valid
  const endOfDay = new Date(eventDate);
  if (isNaN(endOfDay.getTime())) {
    console.error("Invalid date provided");
    return;
  }

  // Set the time to 11:59:59.999 PM on the specified date
  endOfDay.setHours(23, 59, 59, 999);

  const now = new Date();

  // Calculate the time difference
  const timeUntilEndOfDay = endOfDay.getTime() - now.getTime(); // Using .getTime() to ensure 'number' type

  if (timeUntilEndOfDay > 0) {
    setTimeout(async () => {
      try {
        const presentMembers = event.members.filter(
          (member: Member) => member.attended
        );
        const absentMembers = event.members.filter(
          (member: Member) => !member.attended
        );

        const depositAmount = Number(event.price);
        const totalAbsentDeposits = absentMembers.length * depositAmount;

        // Deduct 20%
        const deduction = totalAbsentDeposits * 0.2; // 20%
        const remainingAmount = totalAbsentDeposits - deduction;
        const splitAmount = remainingAmount / presentMembers.length; // Amount each present member receives

        const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

        // Refund deposits to present members
        for (const member of presentMembers) {
          try {
            const order = await db.order.findFirst({
              where: {
                buyerId: member.userId,
                eventId: event.id
              },
            });

            if (!order) {
              throw new Error("Order not found.");
            }

            // Calculate the total amount to refund (deposit - transaction fee)
            const totalRefundAmount = depositAmount - order.transaction_fee;

            const response = await fetch("https://api.paystack.co/refund", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                transaction: member.paymentIntentId,
                amount: Math.round(totalRefundAmount * 100),
              }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error("Refund error:", errorData);
              throw new Error("Refund failed");
            }

            const data = await response.json();

            if (data) {
              await db.user.update({
                where: { id: member.userId },
                data: {
                  balance: {
                    increment: splitAmount,
                  },
                },
              });
              sendPresentMembersEmail(member.user.email, event);
            }
            console.log(`Refunded ${depositAmount} to member ${member.id}`);
          } catch (error) {
            console.error(`Error refunding member ${member.id}:`, error);
          }
        }

        // Notify absent members
        for (const member of absentMembers) {
          try {
            sendAbsentMembersEmail(member.user.email, event);
            console.log(`Notified absent member ${member.id}`);
          } catch (error) {
            console.error(`Error notifying absent member ${member.id}:`, error);
          }
        }

        console.log("End of specified event day task completed successfully");
      } catch (error) {
        console.error("Error executing end of event day task:", error);
      }
    }, timeUntilEndOfDay);
  } else {
    console.log("Specified date has already passed");
  }
};

// Set the scheduleEndOfEventDayTask to run at 11pm everyday i.e (Timeout - 1hr for any event of the current day)
cron.schedule("0 23 * * *", async () => {
  const events = await db.event.findMany({
    where: {
      eventDate: new Date(),
      active: true,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  events.forEach(async (event) => {
    const eventDate: Date = event.eventDate;
    const eventDateString = eventDate.toISOString().split("T")[0]; // Extract only the date part 'YYYY-MM-DD'

    // Set the organizer as present before calling the end of day function.
    await db.event.update({
      where: {
        id: event.id,
        active: true,
      },
      data: {
        members: {
          update: {
            where: {
              userId_eventId: {
                userId: event.userId,
                eventId: event.id,
              },
            },
            data: {
              attended: true,
            },
          },
        },
      },
    });

    scheduleEndOfEventDayTask(eventDateString, event);
    console.log("Running task for end of event day");
  });
});
