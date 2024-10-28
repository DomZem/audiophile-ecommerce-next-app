import { Footer } from "./footer/Footer";
import { Header } from "./Header";

export const BaseLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
