import "~/styles/site.css";
import { BaseLayout } from "~/components/layout/BaseLayout";
import { ModalProvider } from "~/providers/ModalProvider";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout>
      <ModalProvider>{children}</ModalProvider>
    </BaseLayout>
  );
}
