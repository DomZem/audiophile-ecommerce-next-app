import { type product_image } from "@prisma/client";
import Image from "next/image";
import { type DetailedHTMLProps, type LiHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export const ProductImages = ({
  images,
}: {
  images: Pick<product_image, "url" | "alt">[];
}) => {
  if (!images[0] || !images[1] || !images[2]) {
    return null;
  }

  return (
    <ul className="grid h-[756px] grid-rows-4 gap-5 md:h-[368px] md:grid-cols-5 md:grid-rows-2 lg:gap-8">
      <ProductImagesListItem
        className="md:col-span-2"
        src={images[0].url}
        alt={images[0].alt}
      />
      <ProductImagesListItem
        className="md:col-span-2 md:row-start-2"
        src={images[1].url}
        alt={images[1].alt}
      />
      <ProductImagesListItem
        className="row-span-2 md:col-span-3 md:row-span-full"
        src={images[2].url}
        alt={images[2].alt}
      />
    </ul>
  );
};

export const ProductImagesListItem = ({
  className,
  src,
  alt,
  ...props
}: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  src: string;
  alt: string;
}) => {
  return (
    <li
      className={cn("relative overflow-hidden rounded-lg", className)}
      {...props}
    >
      <Image
        className="object-cover"
        src={src}
        alt={alt}
        quality={100}
        fill
        sizes="100vw"
      />
    </li>
  );
};
