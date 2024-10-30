import { CheckoutForm } from "~/components/features/checkout/form/CheckoutForm";
import { GoBackButton } from "~/components/ui/GoBackButton";
import { Wrapper } from "~/components/ui/Wrapper";

export default function CheckoutPage() {
  return (
    <div>
      <Wrapper className="space-y-6 pb-24 pt-4 md:pb-28 md:pt-12 lg:space-y-9 lg:pb-36 lg:pt-20">
        <GoBackButton />
        <main>
          <CheckoutForm />
        </main>
      </Wrapper>
    </div>
  );
}
