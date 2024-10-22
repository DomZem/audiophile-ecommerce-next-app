import { Wrapper } from "../Wrapper";
import { BestGearSection } from "./BestGearSection";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper className="pb-28 pt-10 md:py-24 lg:pb-48 lg:pt-28">
      {children}
      <BestGearSection />
    </Wrapper>
  );
};
