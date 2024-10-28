import { formatPrice } from "~/utils/product/format-price";
import { ProductCard } from "./ProductCard";
import { type product } from "@prisma/client";
import { ProductAddToCart } from "./ProductAddToCart";
import {
  type ComponentProps,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";
import { cn } from "~/lib/utils";
import { ProductAccessoriesList } from "./ProductAccessoriesList";
import { ProductImages } from "./ProductImages";

type Product = Pick<
  product,
  "id" | "name" | "description" | "price_cents" | "card_image_url"
> & {
  accessories: ComponentProps<typeof ProductAccessoriesList>["accessories"];
  images: ComponentProps<typeof ProductImages>["images"];
};

export const ProductFullDetails = ({ product }: { product: Product }) => {
  return (
    <div className="space-y-20 md:space-y-28 lg:space-y-40">
      <ProductCard className="md:flex-row md:gap-16">
        <ProductCard.ImageWrapper className="md:h-[480px] md:min-w-[281px] lg:min-h-[560px] lg:min-w-[540px]">
          <ProductCard.Image src={product.card_image_url} alt={product.name} />
        </ProductCard.ImageWrapper>
        <ProductCard.Content className="max-w-full items-start">
          <ProductCard.Title className="">{product.name}</ProductCard.Title>
          <ProductCard.Description className="text-left">
            {product.description}
          </ProductCard.Description>
          <p className="text-lg text-black">
            $ {formatPrice(product.price_cents)}
          </p>
          <ProductAddToCart className="mt-1.5" productId={product.id} />
        </ProductCard.Content>
      </ProductCard>

      <div className="flex flex-col gap-20 md:gap-28 lg:flex-row lg:items-start lg:gap-32">
        <ProductDetailsSection className="lg:max-w-[635px]">
          <ProductDetailsSection.Title>features</ProductDetailsSection.Title>
          <p>
            As the headphones all others are measured against, the XX99 Mark I
            demonstrates over five decades of audio expertise, redefining the
            critical listening experience. This pair of closed-back headphones
            are made of industrial, aerospace-grade materials to emphasize
            durability at a relatively light weight of 11 oz.{" "}
          </p>

          <p>
            From the handcrafted microfiber ear cushions to the robust metal
            headband with inner damping element, the components work together to
            deliver comfort and uncompromising sound. Its closed-back design
            delivers up to 27 dB of passive noise cancellation, reducing
            resonance by reflecting sound to a dedicated absorber. For
            connectivity, a specially tuned cable is included with a balanced
            gold connector.
          </p>
        </ProductDetailsSection>

        <ProductDetailsSection className="min-w-fit md:flex-row md:gap-40 lg:flex-col lg:gap-8">
          <ProductDetailsSection.Title>in the box</ProductDetailsSection.Title>
          <ProductAccessoriesList accessories={product.accessories} />
        </ProductDetailsSection>
      </div>

      <ProductImages images={product.images} />
    </div>
  );
};

const ProductDetailsSection = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      {children}
    </section>
  );
};

ProductDetailsSection.Title = function ProductDetailsSectionTitle({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-xl uppercase text-black", className)} {...props}>
      {children}
    </h2>
  );
};
