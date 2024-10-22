"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export const MenuListItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        className={cn(
          "text-subtitle font-bold uppercase text-white duration-300 ease-out hover:text-primary",
          isActive && "text-primary",
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};
