import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const db = new PrismaClient();

async function main() {
  // clean up
  await db.user.deleteMany();
  await db.product_accessory.deleteMany();
  await db.product.deleteMany();

  // create admin
  await db.user.create({
    data: {
      email: "admin@gmail.com",
      emailVerified: new Date(),
      role: "ADMIN",
      name: "Admin",
    },
  });

  for (let i = 0; i < 30; i++) {
    await db.product.create({
      data: {
        name: faker.commerce.productName(),
        category: i < 10 ? "EARPHONES" : i < 20 ? "HEADPHONES" : "SPEAKERS",
        description: faker.word.words({ count: { min: 30, max: 45 } }),
        card_image_url: "https://via.placeholder.com/150",
        features_content:
          "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat.",
        price_cents: faker.number.int({ min: 50_00, max: 500_00 }),
        quantity: faker.number.int({ min: 10, max: 100 }),
        accessories: {
          createMany: {
            data: Array.from({
              length: faker.number.int({ min: 1, max: 5 }),
            }).map((_) => ({
              name: faker.commerce.product(),
              quantity: faker.number.int({ min: 1, max: 3 }),
            })),
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
