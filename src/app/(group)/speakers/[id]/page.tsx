import { notFound } from "next/navigation";
import { ProductDetailsView } from "~/components/features/product/ProductDetailsView";
import { db } from "~/server/db";
import { getProductSuggestions } from "~/server/utils/product/get-product-suggestions";

const getSpeakerDetails = async (id: string) => {
  const speaker = await db.product.findFirst({
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

  return speaker;
};

export default async function SpeakerDetailsPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const speaker = await getSpeakerDetails(id);
  const speakerSuggestions = await getProductSuggestions({
    category: "SPEAKERS",
    excludeId: id,
  });

  if (!speaker) {
    return notFound();
  }

  return (
    <ProductDetailsView
      product={speaker}
      suggestions={speakerSuggestions}
      href="/speakers"
    />
  );
}
