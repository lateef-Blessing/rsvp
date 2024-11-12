"use server";

import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { handleError } from "@/lib/utils";
import {
  CreateEventParams,
  DeleteEventAttendanceParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  SendMessageParams,
  UpdateEventParams,
} from "@/types";
import { MemberRole } from "@prisma/client";
import {
  sendEventAttendanceDeletionEmail,
  sendEventDeletionEmail,
  sendEventMessageEmail,
} from "@/lib/mail";

const getCategoryByName = async (name: string) => {
  const category = await db.category.findFirst({
    where: {
      name,
    },
  });

  return category;
};

// GET ALL ACTIVE EVENTS (ADMIN ONLY)
export async function getAllEventsAdmin() {
  try {
    const events = await db.event.findMany({
      where: {
        active: true,
      },
    });
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    handleError(error);
  }
}

// GET ALL EVENTS
export async function getAllEvents({
  userId,
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    const skipAmount = (Number(page) - 1) * limit;
    if (query) {
      const [events, eventsCount] = await db.$transaction([
        db.event.findMany({
          where: {
            title: {
              contains: query,
            },
            active: true,
            members: {
              some: {
                userId,
              },
            },
          },
          skip: skipAmount,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
            category: true,
          },
        }),
        db.event.count({
          where: {
            title: {
              contains: query,
            },
            active: true,
            members: {
              some: {
                userId,
              },
            },
          },
          skip: skipAmount,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(eventsCount / limit),
      };
    } else if (category) {
      const categoryData = await getCategoryByName(category);
      const [events, eventsCount] = await db.$transaction([
        db.event.findMany({
          where: {
            categoryId: categoryData?.id as string,
            active: true,
            members: {
              some: {
                userId,
              },
            },
          },
          skip: skipAmount,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
            category: true,
          },
        }),
        db.event.count({
          where: {
            categoryId: categoryData?.id as string,
            active: true,
            members: {
              some: {
                userId,
              },
            },
          },
          skip: skipAmount,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(eventsCount / limit),
      };
    } else {
      const [events, eventsCount] = await db.$transaction([
        db.event.findMany({
          where: {
            active: true,
            members: {
              some: {
                userId,
              },
            },
          },
          skip: skipAmount,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
            category: true,
          },
        }),
        db.event.count({
          where: {
            active: true,
            members: {
              some: {
                userId,
              },
            },
          },
          skip: skipAmount,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(eventsCount / limit),
      };
    }
  } catch (error) {
    handleError(error);
  }
}

// CREATE EVENT
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    const organizer = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await db.event.create({
      data: {
        ...event,
        userId,
        inviteCode: uuidv4(),
        members: {
          create: [{ userId: userId, role: MemberRole.ADMIN }],
        },
      },
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    const event = await db.event.findFirst({
      where: {
        id: eventId,
        active: true,
      },
      include: {
        user: true,
        category: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!event) throw new Error("Event not found");
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE EVENT
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    const eventToUpdate = await db.event.findFirst({
      where: {
        id: event.id as string,
        active: true,
      },
    });

    if (!eventToUpdate || eventToUpdate.userId !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await db.event.update({
      where: {
        id: event.id,
        active: true,
      },
      data: {
        ...event,
      },
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}

// DELETE EVENT
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    const event = await db.event.findFirst({
      where: {
        id: eventId,
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

    if (event?.members?.length === 0) {
      return;
    }

    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

    // Refund deposits to members
    event?.members.forEach(async (member) => {
      const order = await db.order.findFirst({
        where: {
          buyerId: member.userId,
          eventId: event.id,
        },
      });

      if (!order) {
        throw new Error("Order not found.");
      }

      // Calculate the total amount to refund (deposit - transaction fee)
      const totalRefundAmount = Number(event?.price) - order.transaction_fee;

      try {
        const response = await fetch("https://api.paystack.co/refund", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transaction: member.paymentIntentId,
            amount: totalRefundAmount * 100,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Refund error:", errorData);
          throw new Error("Refund failed");
        }

        const data = await response.json();
        if (data) {
          sendEventDeletionEmail(member.user.email!, event);
        }
        console.log(
          `Refunded $${event.price} to member ${member.id} and sent email notification.`
        );

        const deletedEvent = await db.event.delete({
          where: {
            id: eventId,
          },
        });

        if (deletedEvent) revalidatePath(path);
      } catch (error) {
        console.error(`Error refunding member ${member.id}:`, error);
      }
    });
  } catch (error) {
    handleError(error);
  }
}

// DELETE EVENT ATTENDANCE
export async function deleteEventAttendance({
  eventId,
  userId,
  path,
}: DeleteEventAttendanceParams) {
  try {
    const event = await db.event.findFirst({
      where: {
        id: eventId,
        active: true,
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          where: {
            userId: {
              not: userId,
            },
          },
        },
      },
    });

    if (event) {
      const order = await db.order.findFirst({
        where: {
          buyerId: userId,
          eventId: event.id,
        },
      });

      if (!order) {
        throw new Error("Order not found.");
      }

      // Deduct 20%
      const deduction = Number(event?.price) * 0.2;
      const remainingAmount =
        Number(event?.price) * 0.5 - deduction - order.transaction_fee;
      // Amount each member receives
      const splitAmount = remainingAmount / event?.members?.length;
      console.log(deduction, remainingAmount, splitAmount);

      const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

      const member = await db.member.findFirst({
        where: {
          eventId,
          userId,
        },
        include: {
          user: true,
        },
      });

      if (!member) {
        return;
      }

      try {
        const response = await fetch("https://api.paystack.co/refund", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transaction: member.paymentIntentId,
            amount: (Number(event.price) / 2) * 100,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Refund error:", errorData);
          throw new Error("Refund failed");
        }

        const data = await response.json();
        if (data) {
          for (const member of event?.members) {
            await db.user.update({
              where: { id: member.userId },
              data: {
                balance: {
                  increment: splitAmount,
                },
              },
            });
          }
          sendEventAttendanceDeletionEmail(member.user.email!, event);
        }
        console.log(
          `Refunded $${event.price} to member ${member.id} and sent email notification.`
        );

        const deleteMember = await db.member.delete({
          where: {
            userId_eventId: {
              userId,
              eventId,
            },
          },
        });

        if (deleteMember) revalidatePath(path);
      } catch (error) {
        console.error(`Error refunding member ${member.id}:`, error);
      }
    }
  } catch (error) {
    handleError(error);
  }
}

// STOP EVENT ATTENDANCE
export async function stopEventAttendance({
  eventId,
  userId,
  path,
}: DeleteEventAttendanceParams) {
  try {
    const event = await db.event.update({
      where: {
        id: eventId,
        active: true,
        userId,
      },
      data: {
        stop_attendance: true,
      },
    });

    if (event) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// ENABLE EVENT ATTENDANCE
export async function enableEventAttendance({
  eventId,
  userId,
  path,
}: DeleteEventAttendanceParams) {
  try {
    const event = await db.event.update({
      where: {
        id: eventId,
        active: true,
        userId,
      },
      data: {
        stop_attendance: false,
      },
    });

    if (event) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL EVENTS BY ORGANIZER
export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    const skipAmount = (Number(page) - 1) * limit;
    const [events, eventsCount] = await db.$transaction([
      db.event.findMany({
        where: {
          userId,
          active: true,
        },
        skip: skipAmount,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          category: true,
        },
      }),
      db.event.count({
        where: {
          userId,
          active: true,
        },
        skip: skipAmount,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  userId,
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    const skipAmount = (Number(page) - 1) * limit;
    const categoryData = await db.category.findFirst({
      where: {
        id: categoryId as string,
      },
    });
    const [events, eventsCount] = await db.$transaction([
      db.event.findMany({
        where: {
          id: {
            not: eventId as string,
          },
          categoryId: categoryData?.id as string,
          active: true,
          members: {
            some: {
              userId,
            },
          },
        },
        skip: skipAmount,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          category: true,
        },
      }),
      db.event.count({
        where: {
          id: {
            not: eventId as string,
          },
          categoryId: categoryData?.id as string,
          active: true,
          members: {
            some: {
              userId,
            },
          },
        },
        skip: skipAmount,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// SEND MESSAGE TO MEMBERS
export async function sendMessage({
  eventId,
  userId,
  message,
}: SendMessageParams) {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
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

  if (event) {
    event?.members.forEach((member) => {
      try {
        sendEventMessageEmail(member?.user?.email!, message, event);
        console.log(`Message has been sent to all members of the event.`);
      } catch (error) {
        handleError(error);
      }
    });

    return { status: 200 };
  } else {
    return { error: "Event not found"}
  }
}
