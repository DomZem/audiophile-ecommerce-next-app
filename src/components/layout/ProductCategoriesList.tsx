/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

const productCategories = [
  {
    name: "headphones",
    href: "/headphones",
    src: "/categories/headphones.png",
  },
  {
    name: "speakers",
    href: "/speakers",
    src: "/categories/speakers.png",
  },
  {
    name: "earphones",
    href: "/earphones",
    src: "/categories/earphones.png",
  },
];

export const ProductCategoriesList = () => {
  return (
    <ul className="mt-12 grid grid-rows-3 gap-[72px] md:grid-cols-3 md:grid-rows-none md:gap-2.5 lg:mt-20 lg:gap-8">
      {productCategories.map((category) => (
        <ProductCategoriesListItem key={category.name} {...category} />
      ))}
    </ul>
  );
};

const ProductCategoriesListItem = ({
  href,
  name,
  src,
}: {
  href: string;
  name: string;
  src: string;
}) => {
  return (
    <li>
      <Link
        className="group relative block rounded-lg bg-accent p-6 pt-20 lg:pt-28"
        href={href}
      >
        <ProductCategoriesListItem.Image
          className="lg:hidden"
          width={147}
          height={133}
          src={src}
          alt={name}
        />

        <ProductCategoriesListItem.Image
          className="hidden lg:block"
          src={src}
          width={178}
          height={161}
          alt={name}
        />

        <div className="flex flex-col items-center gap-4">
          <p className="font-bold uppercase leading-normal tracking-[1.07px] text-black lg:text-lg">
            {name}
          </p>
          <div className="inline-flex items-center gap-3.5">
            <p className="text-subtitle uppercase text-black/50 duration-300 group-hover:text-primary">
              shop
            </p>
            <ChevronRight size={20} className="stroke-primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

ProductCategoriesListItem.Image = function ProductCategoriesListItemImage({
  className,
  ...props
}: ComponentProps<typeof Image>) {
  return (
    <Image
      className={cn(
        "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[40%]",
        className,
      )}
      {...props}
    />
  );
};
