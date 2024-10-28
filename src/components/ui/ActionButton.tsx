"use client";

import { useSetAtom } from "jotai";
import { type ComponentProps } from "react";
import {
  type CurrentActiveModal,
  currentActiveModalStore,
} from "~/stores/modal-store";
import { Button } from "./Button";

export const ActionButton = ({
  children,
  modalVariant,
  ...props
}: ComponentProps<typeof Button> & {
  modalVariant: CurrentActiveModal;
}) => {
  const setCurrentActiveModal = useSetAtom(currentActiveModalStore);

  return (
    <Button onClick={() => setCurrentActiveModal(modalVariant)} {...props}>
      {children}
    </Button>
  );
};
