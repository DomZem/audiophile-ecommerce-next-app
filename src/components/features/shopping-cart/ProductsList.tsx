import { useAtomValue } from "jotai";
import { cartProductsStore } from "~/stores/cart-store";
import { api } from "~/trpc/react";
import { ProductsListItem } from "./ProductsListItem";

export const ProductsList = () => {
  const cartProducts = useAtomValue(cartProductsStore);

  const { data: products, isLoading } = api.product.getAllByIds.useQuery({
    ids: cartProducts.map((p) => p.productId),
  });

  if (isLoading) {
    return <p>loading ...</p>;
  }

  return (
    <ul className="space-y-6">
      {products?.map((product) => {
        const cartProduct = cartProducts.find(
          (p) => p.productId === product.id,
        );

        return (
          <ProductsListItem
            product={product}
            key={product.id}
            selectedQuantity={cartProduct ? cartProduct.quantity : 0}
          />
        );
      })}
    </ul>
  );
};
