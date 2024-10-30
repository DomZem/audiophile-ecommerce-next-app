import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export const SummaryContentWrapper = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const SummaryTitle = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p className={cn("uppercase", className)} {...props}>
      {children}
    </p>
  );
};

export const SummaryValue = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p className={cn("text-lg text-black", className)} {...props}>
      {children}
    </p>
  );
};
