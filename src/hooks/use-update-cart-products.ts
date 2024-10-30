import { useSetAtom } from "jotai";
import { cartProductsStore } from "~/stores/cart-store";

export const useUpdateCartProducts = () => {
  const setCartProducts = useSetAtom(cartProductsStore);

  const updateProductQuantity = (productId: string, quantity: number) => {
    setCartProducts((cartProducts) => {
      const existingProduct = cartProducts.find(
        (cp) => cp.productId === productId,
      );

      if (existingProduct) {
        const filteredCartProducts = cartProducts.filter(
          (cp) => cp.productId !== productId,
        );

        const computedQuantity = existingProduct.quantity + quantity;

        if (computedQuantity <= 0) {
          return filteredCartProducts;
        }

        return [
          ...filteredCartProducts,
          {
            productId: productId,
            quantity: computedQuantity,
          },
        ];
      }

      return cartProducts;
    });
  };

  const addProduct = (productId: string, quantity: number) => {
    setCartProducts((cartProducts) => {
      const existingProduct = cartProducts.find(
        (cp) => cp.productId === productId,
      );

      if (existingProduct) {
        const filteredCartProducts = cartProducts.filter(
          (cp) => cp.productId !== productId,
        );

        return [
          ...filteredCartProducts,
          {
            productId,
            quantity: existingProduct.quantity + quantity,
          },
        ];
      }

      return [
        ...cartProducts,
        {
          productId,
          quantity: 1,
        },
      ];
    });
  };

  return { updateProductQuantity, addProduct };
};
