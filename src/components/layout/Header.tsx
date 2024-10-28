import { Sidebar } from "./Sidebar";
import { Wrapper } from "../ui/Wrapper";
import { Logo } from "./Logo";
import { MenuList } from "./MenuList";
import { ActionButton } from "../ui/ActionButton";
import { ShoppingCart } from "../features/shopping-cart/ShoppingCart";

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex h-24 w-full items-center border-b border-[#979797] bg-[#191919]">
      <Wrapper className="flex items-center justify-between">
        <div className="flex items-center gap-11">
          <Sidebar />

          <Logo className="hidden md:block" />
        </div>

        <nav className="hidden lg:block">
          <MenuList />
        </nav>

        <Logo className="md:hidden" />

        <div className="inline-flex items-center gap-3">
          <ActionButton
            className="hidden lg:inline-flex"
            modalVariant="register"
          >
            join us
          </ActionButton>
          <ActionButton
            className="hidden text-white lg:inline-flex"
            variant="secondary"
            modalVariant="login"
          >
            log in
          </ActionButton>

          <ShoppingCart />
        </div>
      </Wrapper>
    </header>
  );
};
