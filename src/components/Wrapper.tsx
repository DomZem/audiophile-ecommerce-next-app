import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export const Wrapper = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 md:px-10", className)}
      {...props}
    >
      {children}
    </div>
  );
};
