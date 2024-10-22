import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";

export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="stroke-white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
            
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
