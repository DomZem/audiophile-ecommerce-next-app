import { useCartProducts } from "./use-cart-products";

export const useCartProductsSummary = () => {
  const { data: products, cartProducts } = useCartProducts();

  let totalCartProductsPriceCents = 0;
  let totalCartProductsVATCents = 0;

  const shippingCostCents = 50_00;

  products?.forEach((product) => {
    const cartProduct = cartProducts.find((p) => p.productId === product.id);

    if (cartProduct) {
      totalCartProductsPriceCents += product.price_cents * cartProduct.quantity;
      totalCartProductsVATCents +=
        product.price_cents *
        (product.vat_percentage / 100) *
        cartProduct.quantity;
    }
  });

  return {
    totalCartProductsPriceCents,
    totalCartProductsVATCents,
    shippingCostCents,
  };
};
