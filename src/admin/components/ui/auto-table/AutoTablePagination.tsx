import { type ComponentProps } from "react";
import { Pagination } from "../Pagination";
import { usePage } from "~/hooks/use-page";
import { RowsPerPageSelect } from "../RowsPerPageSelect";
import { useRowsPerPage } from "~/admin/hooks/use-rows-per-page";
import { cn } from "~/lib/utils";

const defaultPageSizeOptions = [10, 20, 30, 40, 50];

export const AutoTablePagination = ({
  className,
  totalPagesCount,
  pageSizeOptions,
  ...props
}: {
  pageSizeOptions?: number[];
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ComponentProps<typeof Pagination>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPage] = usePage();
  const [rowsPerPage, setRowsPerPage] = useRowsPerPage();

  return (
    <div className={cn("flex justify-end", className)} {...props}>
      <div className="flex items-center gap-6">
        <RowsPerPageSelect
          pageSizeOptions={pageSizeOptions ?? defaultPageSizeOptions}
          value={rowsPerPage.toString()}
          onChange={async (v) => {
            await setPage(1);
            await setRowsPerPage(parseInt(v, 10));
          }}
        />
        <Pagination totalPagesCount={totalPagesCount} />
      </div>
    </div>
  );
};
