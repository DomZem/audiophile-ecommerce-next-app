import { notFound } from "next/navigation";
import { ProductDetailsView } from "~/components/features/product/ProductDetailsView";
import { db } from "~/server/db";
import { getProductSuggestions } from "~/server/utils/product/get-product-suggestions";

const getEarphoneDetails = async (id: string) => {
  const earphone = await db.product.findFirst({
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

  return earphone;
};

export default async function EarphoneDetailsPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const earphone = await getEarphoneDetails(id);
  const earphoneSuggestions = await getProductSuggestions({
    category: "EARPHONES",
    excludeId: id,
  });

  if (!earphone) {
    return notFound();
  }

  return (
    <ProductDetailsView
      product={earphone}
      suggestions={earphoneSuggestions}
      href="/earphones"
    />
  );
}
