export const CategorySection = ({ title }: { title: string }) => {
  return (
    <section className="bg-[#191919] py-8 md:py-24">
      <h1 className="text-center text-2xl uppercase text-white">{title}</h1>
    </section>
  );
};
