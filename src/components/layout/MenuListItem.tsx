"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { cn } from "~/lib/utils";

export const MenuListItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();

  const isActive = segment ? href.includes(segment) : pathname === href;

  return (
    <li>
      <Link
        className={cn(
          "duration-300 ease-out hover:text-primary",
          isActive && "text-primary",
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};
