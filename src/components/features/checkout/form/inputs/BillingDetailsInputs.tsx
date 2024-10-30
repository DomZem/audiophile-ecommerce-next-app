import { FormInputField } from "~/components/ui/Form";
import { FieldsSection } from "./FieldsSection";
import { useFormContext } from "react-hook-form";
import { type TCheckout } from "~/common/validation/checkout";

export const BillingDetailsInputs = () => {
  const form = useFormContext<TCheckout>();

  return (
    <FieldsSection title="billing details">
      <FormInputField
        control={form.control}
        label="First Name"
        name="firstName"
        placeholder="Alexei"
      />
      <FormInputField
        control={form.control}
        label="Last Name"
        name="lastName"
        placeholder="Savchenko"
      />
      <FormInputField
        control={form.control}
        label="Email Address"
        name="email"
        placeholder="alexei@mail.com"
      />
      <FormInputField
        control={form.control}
        label="Phone Number"
        name="phoneNumber"
        placeholder="+1 202-555-0136"
      />
    </FieldsSection>
  );
};
