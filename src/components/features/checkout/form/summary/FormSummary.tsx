import { Button } from "~/components/ui/Button";
import {
  SummaryContentWrapper,
  SummaryTitle,
  SummaryValue,
} from "../../../common/Summary";
import { SummaryProductsList } from "./SummaryProductsList";
import { formatPrice } from "~/utils/product/format-price";
import { useCartProductsSummary } from "~/hooks/use-cart-products-summary";

export const FormSummary = () => {
  const {
    totalCartProductsPriceCents,
    totalCartProductsVATCents,
    shippingCostCents,
  } = useCartProductsSummary();

  return (
    <div className="h-fit space-y-8 rounded-lg bg-white p-6 md:sticky md:top-[120px] lg:w-full lg:max-w-[350px]">
      <h3 className="text-lg uppercase text-black">summary</h3>

      <SummaryProductsList />

      <section className="space-y-6">
        <div className="space-y-2">
          <SummaryContentWrapper>
            <SummaryTitle>total</SummaryTitle>
            <SummaryValue>
              $ {formatPrice(totalCartProductsPriceCents)}
            </SummaryValue>
          </SummaryContentWrapper>
          <SummaryContentWrapper>
            <SummaryTitle>shipping</SummaryTitle>
            <SummaryValue>$ {formatPrice(shippingCostCents)}</SummaryValue>
          </SummaryContentWrapper>
          <SummaryContentWrapper>
            <SummaryTitle>vat (included)</SummaryTitle>
            <SummaryValue>
              $ {formatPrice(totalCartProductsVATCents)}
            </SummaryValue>
          </SummaryContentWrapper>
        </div>

        <SummaryContentWrapper>
          <SummaryTitle>grand total</SummaryTitle>
          <SummaryValue className="text-primary">
            $ {formatPrice(totalCartProductsPriceCents + shippingCostCents)}
          </SummaryValue>
        </SummaryContentWrapper>
      </section>

      <Button className="w-full">continue & pay</Button>
    </div>
  );
};
