import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export const ProductsSmallList = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => {
  return (
    <ul className={cn("space-y-6", className)} {...props}>
      {children}
    </ul>
  );
};
