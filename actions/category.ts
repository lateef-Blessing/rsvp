"use server";

import { db } from "@/lib/db";
import { handleError } from "@/lib/utils";

export async function getAllCategories() {
  try {
    const categories = await db.category.findMany();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
}

export async function createNewCategory({
  categoryName,
}: {
  categoryName: string;
}) {
  try {
    const category = await db.category.create({
      data: {
        name: categoryName,
      },
    });

    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    handleError(error);
  }
}
