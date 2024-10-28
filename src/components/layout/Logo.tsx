import Image from "next/image";
import { cn } from "~/lib/utils";

export const Logo = ({
  className,
  variant = "white",
}: {
  className?: string;
  variant?: "white" | "black";
}) => {
  return (
    <Image
      className={cn("", className)}
      src={variant === "white" ? "/logo-white.svg" : "/logo-black.svg"}
      width={143}
      height={25}
      alt="audiophile logo"
    />
  );
};
