import { db } from "@/lib/db";
import { handleError } from "@/lib/utils";
import { GetUsersBySearchParams } from "@/types";

// GET ALL ORDERS
export async function getOrders({ searchString }: GetUsersBySearchParams) {
  try {
    if (searchString) {
      const orders = await db.order.findMany({
        where: {
          eventTitle: {
            contains: searchString,
            mode: "insensitive",
          },
          isPaid: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      return JSON.parse(JSON.stringify(orders));
    } else {
      const orders = await db.order.findMany({
        where: {
          isPaid: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      return JSON.parse(JSON.stringify(orders));
    }
  } catch (error) {
    handleError(error);
  }
}
