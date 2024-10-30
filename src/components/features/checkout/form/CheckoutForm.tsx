"use client";

import { FormProvider, useForm } from "react-hook-form";
import { FormFields } from "./inputs/FormFields";
import { FormSummary } from "./summary/FormSummary";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type TCheckout } from "~/common/validation/checkout";

export const CheckoutForm = () => {
  const form = useForm<TCheckout>({
    resolver: zodResolver(checkoutSchema),
  });

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-6 md:gap-8 lg:flex-row">
        <FormFields />
        <FormSummary />
      </form>
    </FormProvider>
  );
};
