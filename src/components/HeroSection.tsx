import { Button } from "./ui/Button";
import { Wrapper } from "./ui/Wrapper";

export const HeroSection = () => {
  return (
    <section className="flex min-h-[calc(100dvh-96px)] items-center bg-[#181818]">
      <Wrapper className="relative">
        <div className="relative z-10 max-w-96 text-center lg:text-left">
          <p className="text-[14px] font-normal uppercase leading-normal tracking-[10px] text-white/50">
            new product
          </p>
          <h2 className="mt-4 text-4xl font-bold uppercase text-white md:mt-6 md:text-5xl">
            xx99 mark || headphones
          </h2>
          <p className="mb-7 mt-6 text-white/75 md:mb-10">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Button>see product</Button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center lg:justify-end"></div>
      </Wrapper>
    </section>
  );
};
