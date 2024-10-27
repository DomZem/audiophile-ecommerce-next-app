import { type PrismaClient } from "@prisma/client";

export const speakersSeed = async ({ db }: { db: PrismaClient }) => {
  await db.product.create({
    data: {
      name: "zx9",
      description:
        "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
      category: "SPEAKERS",
      card_image_url: "/products/speakers/zx7/card.png",
      features_content: "",
      quantity: 10,
      price_cents: 4500_00,
      accessories: {
        createMany: {
          data: [
            {
              quantity: 2,
              name: "Speaker Unit",
            },
            {
              quantity: 2,
              name: "Speaker Cloth Panel",
            },
            {
              quantity: 1,
              name: "User Manual",
            },
            {
              quantity: 1,
              name: "3.5mm 10m Audio Cable",
            },
            {
              quantity: 1,
              name: "10m Optical Cable",
            },
          ],
        },
      },
      images: {
        createMany: {
          data: [
            {
              url: "/products/speakers/zx7/gallery-1.jpg",
              alt: "ZX7 Speaker",
            },
            {
              url: "/products/speakers/zx7/gallery-2.jpg",
              alt: "ZX7 Speaker",
            },
            {
              url: "/products/speakers/zx7/gallery-3.jpg",
              alt: "ZX7 Speaker",
            },
          ],
        },
      },
    },
  });

  await db.product.create({
    data: {
      name: "zx7",
      description:
        "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
      category: "SPEAKERS",
      card_image_url: "/products/speakers/zx9/card.png",
      features_content: "",
      quantity: 10,
      price_cents: 3500_00,
      accessories: {
        createMany: {
          data: [
            {
              quantity: 2,
              name: "Speaker Unit",
            },
            {
              quantity: 2,
              name: "Speaker Cloth Panel",
            },
            {
              quantity: 1,
              name: "User Manual",
            },
            {
              quantity: 1,
              name: "3.5mm 7.5m Audio Cable",
            },
            {
              quantity: 1,
              name: "7.5m Optical Cable",
            },
          ],
        },
      },
      images: {
        createMany: {
          data: [
            {
              url: "/products/speakers/zx9/gallery-1.jpg",
              alt: "ZX9 Speaker",
            },
            {
              url: "/products/speakers/zx9/gallery-2.jpg",
              alt: "ZX9 Speaker",
            },
            {
              url: "/products/speakers/zx9/gallery-3.jpg",
              alt: "ZX9 Speaker",
            },
          ],
        },
      },
    },
  });
};
