import { formatPrice } from "~/utils/product/format-price";
import { ProductQuantityCounter } from "../product/ProductQuantityCounter";
import { type RouterOutputs } from "~/trpc/react";
import Image from "next/image";
import { useUpdateCartProducts } from "~/hooks/use-update-cart-products";

export const ProductsListItem = ({
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
    <li className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="relative flex size-16 items-center justify-center rounded-lg bg-accent p-2.5">
          <div className="relative h-full w-full">
            <Image
              className="object-contain"
              src={product.card_image_url}
              fill
              alt=""
            />
          </div>
        </div>
        <div className="font-bold">
          <p className="uppercase text-black">{product.name}</p>
          <p className="text-[14px]">$ {formatPrice(product.price_cents)}</p>
        </div>
      </div>

      <ProductQuantityCounter
        className="h-8 w-24"
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        quantity={selectedQuantity}
      />
    </li>
  );
};
