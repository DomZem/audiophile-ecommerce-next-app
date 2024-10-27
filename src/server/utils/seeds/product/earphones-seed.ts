import { type PrismaClient } from "@prisma/client";

export const earphonesSeed = async ({ db }: { db: PrismaClient }) => {
  await db.product.create({
    data: {
      name: "yx1 wireless",
      description:
        "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
      category: "EARPHONES",
      card_image_url: "/products/earphones/yx1-wireless/card.png",
      features_content: "",
      quantity: 10,
      price_cents: 599_00,
      accessories: {
        createMany: {
          data: [
            {
              quantity: 2,
              name: "Earphone Unit",
            },
            {
              quantity: 6,
              name: "Multi-size Earplugs",
            },
            {
              quantity: 1,
              name: "User Manual",
            },
            {
              quantity: 1,
              name: "USB-C Charging Cable",
            },
            {
              quantity: 1,
              name: "Travel Pouch",
            },
          ],
        },
      },
      images: {
        createMany: {
          data: [
            {
              url: "/products/earphones/yx1-wireless/gallery-1.jpg",
              alt: "YX1 Wireless Earphones",
            },
            {
              url: "/products/earphones/yx1-wireless/gallery-2.jpg",
              alt: "YX1 Wireless Earphones",
            },
            {
              url: "/products/earphones/yx1-wireless/gallery-3.jpg",
              alt: "YX1 Wireless Earphones",
            },
          ],
        },
      },
    },
  });
};
