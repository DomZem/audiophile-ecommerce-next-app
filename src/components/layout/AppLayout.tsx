import { cn } from "~/lib/utils";
import { Wrapper } from "../ui/Wrapper";
import { BestGearSection } from "./BestGearSection";

export const AppLayout = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Wrapper
      className={cn("pb-28 pt-10 md:py-24 lg:pb-48 lg:pt-28", className)}
    >
      {children}
      <BestGearSection />
    </Wrapper>
  );
};
