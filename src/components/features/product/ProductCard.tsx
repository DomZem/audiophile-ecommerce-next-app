import Image from "next/image";
import Link from "next/link";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { Button } from "~/components/ui/Button";
import { cn } from "~/lib/utils";

export const ProductsList = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => {
  return (
    <ul className={cn("grid gap-28 lg:gap-40", className)} {...props}>
      {children}
    </ul>
  );
};

export const ProductCard = ({
  className,
  children,
  isReverse = false,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  isReverse?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:justify-between",
        isReverse && "lg:flex-row-reverse",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

ProductCard.ImageWrapper = function ProductCard2ImageWrapper({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-[352px] w-full items-center justify-center rounded-lg bg-accent p-14 lg:h-[560px] lg:w-[540px] lg:p-20",
        className,
      )}
      {...props}
    >
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
};

ProductCard.Image = function ProductCard2Image({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      className={cn("object-contain", className)}
      src={src}
      alt={alt}
      fill
      quality={100}
    />
  );
};

ProductCard.Content = function ProductCard2Content({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex max-w-xl flex-col items-center gap-6 lg:max-w-md lg:items-start",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

ProductCard.Title = function ProductCard2Title({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-center text-2xl uppercase text-black md:text-4xl lg:text-left",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

ProductCard.Subtitle = function ProductCard2Subtitle({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  return (
    <p
      className={cn("text-overline uppercase text-primary", className)}
      {...props}
    >
      {children}
    </p>
  );
};

ProductCard.Description = function ProductCard2Description({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  return (
    <p
      className={cn("text-center md:mt-2 lg:mb-4 lg:text-left", className)}
      {...props}
    >
      {children}
    </p>
  );
};

ProductCard.Button = function ProductCard2Button({ href }: { href: string }) {
  return (
    <Button asChild>
      <Link href={href}>see product</Link>
    </Button>
  );
};
