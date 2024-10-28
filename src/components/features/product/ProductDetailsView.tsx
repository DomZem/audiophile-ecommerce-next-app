import { PageLayout } from "~/components/layout/PageLayout";
import { GoBackButton } from "~/components/ui/GoBackButton";
import { ProductFullDetails } from "./ProductFullDetails";
import { ProductSuggestions } from "./ProductSuggestions";
import { type ComponentProps } from "react";

export const ProductDetailsView = ({
  product,
  suggestions,
  href,
}: {
  product: ComponentProps<typeof ProductFullDetails>["product"];
  suggestions: ComponentProps<typeof ProductSuggestions>["products"];
  href: string;
}) => {
  return (
    <main>
      <PageLayout className="pt-4 md:pt-9 lg:pt-20">
        <div className="space-y-6 lg:space-y-14">
          <GoBackButton />
          <ProductFullDetails product={product} />
        </div>

        <ProductSuggestions products={suggestions} href={href} />
      </PageLayout>
    </main>
  );
};
