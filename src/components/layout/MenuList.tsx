import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import { MenuListItem } from "./MenuListItem";

export const MenuList = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => {
  return (
    <ul
      className={cn("flex flex-col gap-4 md:flex-row md:gap-8", className)}
      {...props}
    >
      <MenuListItem href="/">home</MenuListItem>
      <MenuListItem href="/headphones">headphones</MenuListItem>
      <MenuListItem href="/speakers">speakers</MenuListItem>
      <MenuListItem href="/earphones">earphones</MenuListItem>
      {children}
    </ul>
  );
};
