// import Link from "next/link";
// import { getServerAuthSession } from "~/server/auth";
// import { api, HydrateClient } from "~/trpc/server";
import { ProductCategoriesList } from "~/components/layout/ProductCategoriesList";
import { Button } from "~/components/ui/Button";
import Image from "next/image";
import { HeroSection } from "~/components/HeroSection";
import { AppLayout } from "~/components/layout/AppLayout";

export default function HomePage() {
  // const session = await getServerAuthSession();

  return (
    <div>
      <HeroSection />
      <AppLayout>
        <ProductCategoriesList />
        <main className="space-y-6 py-28">
          <div className="flex flex-col items-center gap-8 rounded-lg bg-primary px-6 py-14 md:gap-16">
            <Image
              src="/image-speaker-zx9.png"
              width={172}
              height={207}
              alt="asda"
            />

            <div className="flex flex-col items-center gap-6">
              <p className="max-w-64 text-center text-[36px] font-bold uppercase leading-10 tracking-[0.035em] text-white md:text-5xl">
                zy9 <br /> speaker
              </p>
              <p className="max-w-80 text-center text-white/75 md:mb-10">
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Button variant="secondary">see product</Button>
            </div>
          </div>

          <div
            className="relative h-80 w-full overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat lg:bg-right-bottom"
            style={{
              backgroundImage: "url(/image-speaker-zx7.jpg)",
            }}
          >
            <div className="absolute inset-0 inline-flex items-center px-6 md:px-16 lg:px-24">
              <div className="flex-1 space-y-8">
                <p className="text-2xl uppercase text-black">zx7 speaker</p>
                <Button variant="outline">see product</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6 md:grid-cols-2 md:grid-rows-none md:gap-2.5 lg:gap-7">
            <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-80">
              <Image
                className="object-cover"
                src="/yx1-earphones.jpg"
                fill
                quality={100}
                alt="as"
              />
            </div>

            <div className="inline-flex items-center rounded-lg bg-accent p-6 md:pl-10 lg:pl-24">
              <div className="space-y-8">
                <p className="text-2xl uppercase text-black">yx1 earphones</p>
                <Button variant="outline">see product</Button>
              </div>
            </div>
          </div>
        </main>
      </AppLayout>
    </div>
  );
}
