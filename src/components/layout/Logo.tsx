import Image from "next/image";
import { cn } from "~/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      className={cn("", className)}
      src="/audiophile-logo.svg"
      width={143}
      height={25}
      alt="audiophile logo"
    />
  );
};
