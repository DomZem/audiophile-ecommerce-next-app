import { notFound } from "next/navigation";
import { ProductDetailsView } from "~/components/features/product/ProductDetailsView";
import { db } from "~/server/db";
import { getProductSuggestions } from "~/server/utils/product/get-product-suggestions";

const getHeadphoneDetails = async (id: string) => {
  const headphone = await db.product.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price_cents: true,
      card_image_url: true,
      accessories: {
        select: {
          id: true,
          quantity: true,
          name: true,
        },
      },
      images: {
        select: {
          url: true,
          alt: true,
        },
      },
    },
  });

  return headphone;
};

export default async function HeadphoneDetailsPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const headphone = await getHeadphoneDetails(id);
  const headphoneSuggestions = await getProductSuggestions({
    category: "HEADPHONES",
    excludeId: id,
  });

  if (!headphone) {
    return notFound();
  }

  return (
    <ProductDetailsView
      product={headphone}
      suggestions={headphoneSuggestions}
      href="/headphones"
    />
  );
}
