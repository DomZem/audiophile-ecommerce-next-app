import { formatPrice } from "~/utils/product/format-price";
import { ProductQuantityCounter } from "../product/ProductQuantityCounter";
import { type RouterOutputs } from "~/trpc/react";
import { useUpdateCartProducts } from "~/hooks/use-update-cart-products";
import { ProductSmallCard } from "../common/ProductSmallCard";

export const CartProductsListItem = ({
  product,
  selectedQuantity,
}: {
  product: RouterOutputs["product"]["getAllByIds"][0];
  selectedQuantity: number;
}) => {
  const { updateProductQuantity } = useUpdateCartProducts();

  const handleIncrement = () => {
    updateProductQuantity(product.id, 1);
  };

  const handleDecrement = () => {
    updateProductQuantity(product.id, -1);
  };

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

        <ProductQuantityCounter
          className="h-8 w-24"
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          quantity={selectedQuantity}
        />
      </ProductSmallCard>
    </li>
  );
};
