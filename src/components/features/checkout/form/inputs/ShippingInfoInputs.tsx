import { FormInputField } from "~/components/ui/Form";
import { FieldsSection } from "./FieldsSection";
import { useFormContext } from "react-hook-form";
import { type TCheckout } from "~/common/validation/checkout";

export const ShippingInfoInputs = () => {
  const form = useFormContext<TCheckout>();

  return (
    <FieldsSection title="shipping info">
      <FormInputField
        control={form.control}
        label="Street Address"
        name="streetAddress"
        placeholder="1137 Williams Avenue"
      />

      <FormInputField
        control={form.control}
        label="ZIP Code"
        name="zipCode"
        placeholder="10001"
      />

      <FormInputField
        control={form.control}
        label="City"
        name="city"
        placeholder="New York"
      />

      <FormInputField
        control={form.control}
        label="Country"
        name="country"
        placeholder="United States"
      />
    </FieldsSection>
  );
};
