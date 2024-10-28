import { LoginModal } from "~/components/features/auth/login/LoginModal";
import { RegisterModal } from "~/components/features/auth/register/RegisterModal";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      {children}
    </>
  );
};
