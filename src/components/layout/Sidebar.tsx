import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";
import { ActionButton } from "../ui/ActionButton";
import { Logo } from "./Logo";
import { Separator } from "../ui/Separator";
import { MenuList } from "./MenuList";

export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="stroke-white" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between" side="left">
        <div>
          <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <SheetTitle className="sr-only">mobile menu</SheetTitle>
            <SheetDescription className="sr-only"></SheetDescription>
            <Logo variant="black" />
            <SheetClose className="" />
          </SheetHeader>

          <Separator />

          <nav className="py-4">
            <MenuList className="text-black md:flex-col md:gap-4" />
          </nav>
        </div>

        <div>
          <Separator />
          <SheetFooter className="flex flex-col gap-3 pt-4">
            <ActionButton className="flex-1" modalVariant="register">
              join us
            </ActionButton>
            <ActionButton
              className="flex-1"
              variant="secondary"
              modalVariant="login"
            >
              log in
            </ActionButton>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
