import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userToDelete = await db.user.delete({
      where: {
        id: params?.userId,
      },
    });

    if (userToDelete) {
      return NextResponse.json({ status: 200 });
    }
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Retrieve the current user's `suspended` status
    const existingUser = await db.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Toggle the `suspended` value
    const updatedUser = await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        suspended: !existingUser.suspended,
      },
    });

    return NextResponse.json({ status: 200, suspended: updatedUser.suspended });
  } catch (error) {
    console.log("[USERS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
