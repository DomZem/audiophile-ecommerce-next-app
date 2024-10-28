export const formatPrice = (priceCents: number): string => {
  const dolars = Math.floor(priceCents / 100);
  const cents = priceCents % 100;

  return `${dolars},${cents.toString().padStart(2, "0")}`;
};
