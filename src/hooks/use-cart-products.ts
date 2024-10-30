import { useAtomValue } from "jotai";
import { cartProductsStore } from "~/stores/cart-store";
import { api } from "~/trpc/react";

export const useCartProducts = () => {
  const cartProducts = useAtomValue(cartProductsStore);

  return {
    ...api.product.getAllByIds.useQuery({
      ids: cartProducts.map((p) => p.productId),
    }),
    cartProducts,
  };
};
