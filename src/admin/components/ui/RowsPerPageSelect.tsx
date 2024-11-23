import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

export const RowsPerPageSelect = ({
  value,
  onChange,
  pageSizeOptions,
}: {
  value: string;
  onChange: (value: string) => void;
  pageSizeOptions: number[];
}) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[4.5rem]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          {pageSizeOptions.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
