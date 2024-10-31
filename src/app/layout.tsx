import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { Manrope } from "next/font/google";
import { Toaster } from "~/components/ui/Toaster";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "audiophile",
  description:
    "Shop the best headphones, earbuds, and speakers from the world's top audio brands. Free shipping and returns. 30-day money-back guarantee.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.className}`}>
      <body>
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
