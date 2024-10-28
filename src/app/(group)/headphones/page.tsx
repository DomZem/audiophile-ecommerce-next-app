import { CategorySection } from "~/components/features/CategorySection";
import {
  ProductCard,
  ProductsList,
} from "~/components/features/product/ProductCard";
import { PageLayout } from "~/components/layout/PageLayout";
import { db } from "~/server/db";

const getHeadphones = async () => {
  const headphones = await db.product.findMany({
    where: {
      category: "HEADPHONES",
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      name: true,
      description: true,
      card_image_url: true,
      created_at: true,
    },
  });

  return headphones;
};

export default async function HeadphonesPage() {
  const headphones = await getHeadphones();

  return (
    <main>
      <CategorySection title="headphones" />
      <PageLayout>
        <ProductsList>
          {headphones.map(({ id, name, description, card_image_url }, i) => (
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
                  <ProductCard.Button href={`/headphones/${id}`} />
                </ProductCard.Content>
              </ProductCard>
            </li>
          ))}
        </ProductsList>
      </PageLayout>
    </main>
  );
}
