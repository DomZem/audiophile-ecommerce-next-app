import Link from "next/link";
import { Button } from "~/components/ui/Button";

export const ProductSuggestions = ({
  products,
  href,
}: {
  products: {
    id: string;
    name: string;
  }[];
  href: string;
}) => {
  return (
    <div className="space-y-10 md:space-y-14 lg:space-y-16">
      <h2 className="text-center text-xl uppercase text-black md:text-3xl">
        you may also like
      </h2>
      <ul className="grid gap-14 md:grid-cols-3 md:gap-2.5 lg:gap-7">
        {products.map((product) => (
          <ProductSuggestionsListItem
            key={product.id}
            name={product.name}
            link={`${href}/${product.id}`}
          />
        ))}
      </ul>
    </div>
  );
};

const ProductSuggestionsListItem = ({
  name,
  link,
}: {
  name: string;
  link: string;
}) => {
  return (
    <li className="flex flex-col items-center gap-8 md:gap-10">
      <div className="relative h-28 w-full rounded-lg bg-accent md:h-80"></div>

      <div className="flex flex-col items-center gap-8">
        <h3 className="text-center text-xl uppercase text-black">{name}</h3>
        <Button asChild>
          <Link href={link}>see product</Link>
        </Button>
      </div>
    </li>
  );
};
