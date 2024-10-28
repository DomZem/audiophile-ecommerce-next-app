import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";
import { cn } from "~/lib/utils";

export const ProductQuantityCounter = ({
  quantity,
  onIncrement,
  onDecrement,
  className,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid h-12 w-32 grid-cols-3 bg-accent text-subtitle font-bold",
        className,
      )}
    >
      <CounterButton onClick={onDecrement}>-</CounterButton>
      <span className="inline-flex items-center justify-center text-black">
        {quantity}
      </span>
      <CounterButton onClick={onIncrement}>+</CounterButton>
    </div>
  );
};

const CounterButton = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={cn("text-black/25 duration-300 hover:text-primary", className)}
      {...props}
    >
      {children}
    </button>
  );
};
