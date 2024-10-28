import { CategorySection } from "~/components/features/CategorySection";
import {
  ProductCard,
  ProductsList,
} from "~/components/features/product/ProductCard";
import { PageLayout } from "~/components/layout/PageLayout";
import { db } from "~/server/db";

const getSpeakers = async () => {
  const speakers = await db.product.findMany({
    where: {
      category: "SPEAKERS",
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      name: true,
      card_image_url: true,
      description: true,
      created_at: true,
    },
  });

  return speakers;
};

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

  return (
    <main>
      <CategorySection title="speakers" />
      <PageLayout>
        <ProductsList>
          {speakers.map(({ id, name, description, card_image_url }, i) => (
            <li key={id}>
              <ProductCard isReverse={i % 2 !== 0}>
                <ProductCard.ImageWrapper>
                  <ProductCard.Image src={card_image_url} alt={name} />
                </ProductCard.ImageWrapper>
                <ProductCard.Content>
                  {i === 0 && (
                    <ProductCard.Subtitle>new product</ProductCard.Subtitle>
                  )}

                  <ProductCard.Title>{name}</ProductCard.Title>
                  <ProductCard.Description>
                    {description}
                  </ProductCard.Description>
                  <ProductCard.Button href={`/speakers/${id}`} />
                </ProductCard.Content>
              </ProductCard>
            </li>
          ))}
        </ProductsList>
      </PageLayout>
    </main>
  );
}
