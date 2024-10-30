import { CartProductsListItem } from "./CartProductsListItem";
import { ProductsSmallList } from "../common/ProductsSmallList";
import { useCartProducts } from "~/hooks/use-cart-products";

export const CartProductsList = () => {
  const { data: products, isLoading, cartProducts } = useCartProducts();

  if (isLoading) {
    return <p>loading ...</p>;
  }

  return (
    <ProductsSmallList>
      {products?.map((product) => {
        const cartProduct = cartProducts.find(
          (p) => p.productId === product.id,
        );

        return (
          <CartProductsListItem
            product={product}
            key={product.id}
            selectedQuantity={cartProduct?.quantity ?? 0}
          />
        );
      })}
    </ProductsSmallList>
  );
};
