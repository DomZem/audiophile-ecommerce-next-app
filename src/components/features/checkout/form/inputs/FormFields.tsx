import { BillingDetailsInputs } from "./BillingDetailsInputs";
import { ShippingInfoInputs } from "./ShippingInfoInputs";

export const FormFields = () => {
  return (
    <div className="space-y-8 rounded-lg bg-white p-6 lg:flex-1">
      <h2 className="text-2xl uppercase text-black md:text-3xl">checkout</h2>
      <BillingDetailsInputs />
      <ShippingInfoInputs />
    </div>
  );
};
