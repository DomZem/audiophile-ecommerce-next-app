import { PrismaClient } from "@prisma/client";
import { headphonesSeed } from "./product/headphones-seed";
import { speakersSeed } from "./product/speakers-seed";
import { earphonesSeed } from "./product/earphones-seed";

const db = new PrismaClient();

async function main() {
  // clean up
  await db.user.deleteMany();
  await db.product_accessory.deleteMany();
  await db.product_image.deleteMany();
  await db.product.deleteMany();

  await headphonesSeed({ db });
  await speakersSeed({ db });
  await earphonesSeed({ db });
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
