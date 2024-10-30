import { useCartProducts } from "~/hooks/use-cart-products";
import { ProductsSmallList } from "../../../common/ProductsSmallList";
import { SummaryProductsListItem } from "./SummaryProductsListItem";

export const SummaryProductsList = () => {
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
          <SummaryProductsListItem
            product={product}
            selectedQuantity={cartProduct?.quantity ?? 0}
            key={product.id}
          />
        );
      })}
    </ProductsSmallList>
  );
};
