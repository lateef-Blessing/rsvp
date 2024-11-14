import { db } from "@/lib/db";
import { handleError } from "@/lib/utils";
import { GetMembersByEventParams } from "@/types";

// GET MEMBERS BY EVENT
export async function getMembersByEventId({
  searchString,
  eventId,
}: GetMembersByEventParams) {
  try {
    if (!eventId) throw new Error("Event ID is required");

    if (searchString) {
      const members = await db.member.findMany({
        where: {
          eventId,
          user: {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        },
        include: {
          user: true,
        },
      });

      return JSON.parse(JSON.stringify(members));
    } else {
      const members = await db.member.findMany({
        where: {
          eventId,
        },
        include: {
          user: true,
        },
      });

      return JSON.parse(JSON.stringify(members));
    }
  } catch (error) {
    handleError(error);
  }
}

// GET MEMBER BY MEMBER ID
export async function getMemberById({ memberId }: { memberId: string }) {
  try {
    if (!memberId) throw new Error("Member ID is required");
    const member = await db.member.findFirst({
      where: {
        userId: memberId,
      },
      include: {
        user: true,
      },
    });

    return JSON.parse(JSON.stringify(member));
  } catch (error) {
    handleError(error);
  }
}
