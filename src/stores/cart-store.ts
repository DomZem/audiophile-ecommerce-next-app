import { atomWithStorage } from "jotai/utils";

export const cartProductsStore = atomWithStorage<
  {
    productId: string;
    quantity: number;
  }[]
>("cartProducts", []);
