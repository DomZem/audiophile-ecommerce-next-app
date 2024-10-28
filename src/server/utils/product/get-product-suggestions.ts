import { type ProductCategory } from "@prisma/client";
import { db } from "~/server/db";

export const getProductSuggestions = async ({
  category,
  excludeId,
}: {
  category: ProductCategory;
  excludeId: string;
}) => {
  const products = await db.product.findMany({
    where: {
      id: {
        not: excludeId,
      },
      category,
    },
    select: {
      id: true,
      name: true,
    },
    take: 3,
  });

  return products;
};
