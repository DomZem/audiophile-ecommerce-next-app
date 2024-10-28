import { atom } from "jotai";

export type CurrentActiveModal =
  | "login"
  | "register"
  | "forgot-password"
  | "reset-password"
  | "none";

export const currentActiveModalStore = atom<CurrentActiveModal>("none");
