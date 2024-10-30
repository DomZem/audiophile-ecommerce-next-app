import { cn } from "~/lib/utils";

export const FieldsSection = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <section className={cn("grid gap-6", className)}>
      <p className="text-subtitle uppercase text-primary">{title}</p>
      {children}
    </section>
  );
};
