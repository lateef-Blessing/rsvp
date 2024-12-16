import { db } from "@/lib/db";
import { handleError } from "@/lib/utils";
import { DeleteUserParams, GetUsersBySearchParams } from "@/types";
import { revalidatePath } from "next/cache";

// GET ALL USERS
export async function getUsers({ searchString }: GetUsersBySearchParams) {
  try {
    if (searchString) {
      const users = await db.user.findMany({
        where: {
          name: {
            contains: searchString,
            mode: "insensitive",
          },
        },
      });

      return JSON.parse(JSON.stringify(users));
    } else {
      const users = await db.user.findMany();

      return JSON.parse(JSON.stringify(users));
    }
  } catch (error) {
    handleError(error);
  }
}

// GET ONE USER BY ID
export async function getUserById(userId: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// DELETE USER
export async function deleteUser({ userId, path }: DeleteUserParams) {
  try {
    const deletedUser = await db.user.delete({
      where: {
        id: userId,
      },
    });

    if (deletedUser) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}
