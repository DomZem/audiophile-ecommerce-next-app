"use client";

import { useAtom } from "jotai";
import { ShoppingCart as Cart } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import { cartProductsStore } from "~/stores/cart-store";
import { formatPrice } from "~/utils/product/format-price";
import { ProductsList } from "./ProductsList";
import { api } from "~/trpc/react";
import { useState } from "react";

export const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartProducts, setCartProducts] = useAtom(cartProductsStore);

  const { data: products } = api.product.getAllByIds.useQuery({
    ids: cartProducts.map((p) => p.productId),
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const totalAmountCents = products?.reduce((sum, product) => {
    const cartProduct = cartProducts.find((p) => p.productId === product.id);
    if (!cartProduct) return sum;
    sum += product.price_cents * cartProduct.quantity;
    return sum;
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <button
        className="relative"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <Cart className="icon" />

        <span className="absolute bottom-0 right-0 inline-flex size-5 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-primary text-[12px] text-white">
          {cartProducts.length}
        </span>
      </button>
      <DialogContent className="gap-8 md:p-8">
        <DialogHeader className="flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg font-bold uppercase text-black">
            cart ({cartProducts.length})
          </DialogTitle>
          <button
            className="underline hover:text-primary"
            onClick={() => setCartProducts([])}
          >
            Remove all
          </button>
        </DialogHeader>

        <ProductsList />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="uppercase">total</p>
            <p className="text-lg text-black">
              ${totalAmountCents ? formatPrice(totalAmountCents) : "0.00"}
            </p>
          </div>
          <Button className="w-full" onClick={handleClose} asChild>
            <Link href="/checkout">checkout</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
