import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAllByIds: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.product.findMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        select: {
          id: true,
          name: true,
          card_image_url: true,
          price_cents: true,
          quantity: true,
          vat_percentage: true,
        },
      });

      return products;
    }),
});
