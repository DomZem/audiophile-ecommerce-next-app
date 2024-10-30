import { ProductSmallCard } from "~/components/features/common/ProductSmallCard";
import { type RouterOutputs } from "~/trpc/react";
import { formatPrice } from "~/utils/product/format-price";

export const SummaryProductsListItem = ({
  product,
  selectedQuantity,
}: {
  product: RouterOutputs["product"]["getAllByIds"][0];
  selectedQuantity: number;
}) => {
  return (
    <li>
      <ProductSmallCard>
        <ProductSmallCard.Content>
          <ProductSmallCard.ImageWrapper>
            <ProductSmallCard.Image
              src={product.card_image_url}
              alt={product.name}
            />
          </ProductSmallCard.ImageWrapper>
          <div>
            <ProductSmallCard.Title>{product.name}</ProductSmallCard.Title>
            <ProductSmallCard.Subtitle>
              $ {formatPrice(product.price_cents)}
            </ProductSmallCard.Subtitle>
          </div>
        </ProductSmallCard.Content>

        <p className="font-bold">x{selectedQuantity}</p>
      </ProductSmallCard>
    </li>
  );
};
