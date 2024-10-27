import { type PrismaClient } from "@prisma/client";

export const headphonesSeed = async ({ db }: { db: PrismaClient }) => {
  await db.product.create({
    data: {
      name: "xx99 mark II",
      description:
        "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
      category: "HEADPHONES",
      card_image_url: "/products/headphones/x99-mark-2/card.png",
      quantity: 10,
      price_cents: 2999_00,
      features_content: "",
      accessories: {
        createMany: {
          data: [
            {
              quantity: 1,
              name: "Headphone Unit",
            },
            {
              quantity: 2,
              name: "Replacement Earcups",
            },
            {
              quantity: 1,
              name: "User Manual",
            },
            {
              quantity: 1,
              name: "3.5mm 5m Audio Cable",
            },
            {
              quantity: 1,
              name: "Travel Bag",
            },
          ],
        },
      },
      images: {
        createMany: {
          data: [
            {
              url: "/products/headphones/x99-mark-2/gallery-1.jpg",
              alt: "XX99 Mark II Headphones",
            },
            {
              url: "/products/headphones/x99-mark-2/gallery-2.jpg",
              alt: "XX99 Mark II Headphones",
            },
            {
              url: "/products/headphones/x99-mark-2/gallery-3.jpg",
              alt: "XX99 Mark II Headphones",
            },
          ],
        },
      },
    },
  });

  await db.product.create({
    data: {
      name: "xx99 mark I",
      description:
        "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
      category: "HEADPHONES",
      card_image_url: "/products/headphones/x99-mark-1/card.png",
      quantity: 10,
      price_cents: 1750_00,
      features_content: "",
      accessories: {
        createMany: {
          data: [
            {
              quantity: 1,
              name: "Headphone Unit",
            },
            {
              quantity: 2,
              name: "Replacement Earcups",
            },
            {
              quantity: 1,
              name: "User Manual",
            },

            {
              quantity: 1,
              name: "3.5mm 5m Audio Cable",
            },
          ],
        },
      },
      images: {
        createMany: {
          data: [
            {
              url: "/products/headphones/x99-mark-1/gallery-1.jpg",
              alt: "XX99 Mark I Headphones",
            },
            {
              url: "/products/headphones/x99-mark-1/gallery-2.jpg",
              alt: "XX99 Mark I Headphones",
            },
            {
              url: "/products/headphones/x99-mark-1/gallery-3.jpg",
              alt: "XX99 Mark I Headphones",
            },
          ],
        },
      },
    },
  });

  await db.product.create({
    data: {
      name: "xx59",
      description:
        "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
      category: "HEADPHONES",
      card_image_url: "/products/headphones/xx59/card.png",
      quantity: 10,
      price_cents: 899_00,
      features_content: "",
      accessories: {
        createMany: {
          data: [
            {
              quantity: 1,
              name: "Headphone Unit",
            },
            {
              quantity: 2,
              name: "Replacement Earcups",
            },
            {
              quantity: 1,
              name: "User Manual",
            },
            {
              quantity: 1,
              name: "3.5mm 5m Audio Cable",
            },
          ],
        },
      },
      images: {
        createMany: {
          data: [
            {
              url: "/products/headphones/xx59/gallery-1.jpg",
              alt: "XX59 Headphones",
            },
            {
              url: "/products/headphones/xx59/gallery-2.jpg",
              alt: "XX59 Headphones",
            },
            {
              url: "/products/headphones/xx59/gallery-3.jpg",
              alt: "XX59 Headphones",
            },
          ],
        },
      },
    },
  });
};
