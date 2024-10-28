import { cn } from "~/lib/utils";
import { AppLayout } from "./AppLayout";
import { ProductCategoriesList } from "./ProductCategoriesList";

export const PageLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <AppLayout
      className={cn("space-y-28 pb-28 pt-16 lg:space-y-40 lg:py-40", className)}
    >
      {children}
      <ProductCategoriesList />
    </AppLayout>
  );
};
