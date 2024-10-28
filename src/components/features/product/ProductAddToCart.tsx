"use client";

import { type DetailedHTMLProps, type HTMLAttributes, useState } from "react";
import { Button } from "~/components/ui/Button";
import { ProductQuantityCounter } from "./ProductQuantityCounter";
import { cn } from "~/lib/utils";
import { useToast } from "~/hooks/use-toast";
import { useUpdateCartProducts } from "~/hooks/use-update-cart-products";

export const ProductAddToCart = ({
  className,
  productId,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  productId: string;
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useUpdateCartProducts();
  const { toast } = useToast();

  const handleAddProduct = () => {
    addProduct(productId, quantity);
    toast({
      title: "Successfully added to cart",
      description: "",
    });
  };

  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <ProductQuantityCounter
        quantity={quantity}
        onDecrement={() => setQuantity((prev) => Math.max(1, prev - 1))}
        onIncrement={() => setQuantity((prev) => prev + 1)}
      />
      <Button onClick={handleAddProduct}>add to cart</Button>
    </div>
  );
};
