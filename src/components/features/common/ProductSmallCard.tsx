/* eslint-disable jsx-a11y/alt-text */
import {
  type ComponentProps,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";
import { cn } from "~/lib/utils";
import Image from "next/image";

export const ProductSmallCard = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

ProductSmallCard.Content = function ProductSmallCardContent({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      {children}
    </div>
  );
};

ProductSmallCard.ImageWrapper = function ProductSmallCardImageWrapper({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex size-16 items-center justify-center rounded-lg bg-accent p-2.5",
        className,
      )}
      {...props}
    >
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
};

ProductSmallCard.Image = function ProductSmallCardImage({
  className,
  ...props
}: ComponentProps<typeof Image>) {
  return <Image className={cn("object-contain", className)} fill {...props} />;
};

ProductSmallCard.Title = function ProductSmallCardTitle({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  return (
    <p className={cn("font-bold uppercase text-black", className)} {...props}>
      {children}
    </p>
  );
};

ProductSmallCard.Subtitle = function ProductSmallCardSubtitle({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  return (
    <p className={cn("text-[14px]", className)} {...props}>
      {children}
    </p>
  );
};
