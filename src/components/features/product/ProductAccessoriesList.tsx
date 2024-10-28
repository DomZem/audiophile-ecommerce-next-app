export const ProductAccessoriesList = ({
  accessories,
}: {
  accessories: {
    id: string;
    quantity: number;
    name: string;
  }[];
}) => {
  return (
    <ul className="space-y-2">
      {accessories.map(({ id, name, quantity }) => (
        <li className="flex items-center gap-6" key={id}>
          <p className="font-bold text-primary">{quantity}x</p>
          <p className="font-medium">{name}</p>
        </li>
      ))}
    </ul>
  );
};
