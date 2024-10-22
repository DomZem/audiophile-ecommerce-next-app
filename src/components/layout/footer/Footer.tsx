import { Wrapper } from "../../Wrapper";
import { MenuList } from "../MenuList";
import { Logo } from "../Logo";
import { Line } from "./Line";
import { SocialLinks } from "./SocialLinks";

export const Footer = () => {
  return (
    <footer className="bg-muted">
      <Wrapper className="relative flex flex-col items-center gap-12 pb-9 pt-12 md:items-start md:gap-8 md:pb-11 md:pt-14 lg:gap-9 lg:pb-12 lg:pt-16">
        <Line />

        <div className="flex w-full flex-col items-center gap-12 md:items-start md:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo />

          <nav>
            <MenuList className="items-center" />
          </nav>
        </div>

        <p className="text-center text-white/50 md:text-left lg:max-w-xl">
          Audiophile is an all in one stop to fulfill your audio needs.
          We&apos;re a small team of music lovers and sound specialists who are
          devoted to helping you get the most out of personal audio. Come and
          visit our demo facility - we&apos;re open 7 days a week.
        </p>

        <div className="flex w-full flex-col items-center gap-12 md:mt-12 md:w-full md:flex-row md:justify-between lg:mt-5">
          <p className="text-white/50">
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>

          <SocialLinks />
        </div>
      </Wrapper>
    </footer>
  );
};
