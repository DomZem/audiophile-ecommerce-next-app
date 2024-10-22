import Image from "next/image";

export const BestGearSection = () => {
  return (
    <section className="flex flex-col gap-10 md:gap-16 lg:flex-row-reverse lg:items-center lg:gap-32">
      <div className="relative h-72 w-full lg:h-[588px] lg:min-w-[540px]">
        <Image
          className="rounded-lg object-cover"
          src="/best-gear.jpg"
          fill
          alt=""
          quality={100}
        />
      </div>

      <div className="text-center mx-auto max-w-xl space-y-8 lg:max-w-md lg:text-left">
        <h3 className="text-2xl uppercase text-black md:text-4xl">
          bringing you the <span className="text-primary">best</span> audio gear
        </h3>

        <p>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
};
