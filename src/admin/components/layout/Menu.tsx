"use client";

import { Fish, Home, ShoppingCart, Soup, Speaker, User } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Speaker,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Dishes",
    url: "/admin/dishes",
    icon: Soup,
  },
  {
    title: "Ingredients",
    url: "/admin/ingredients",
    icon: Fish,
  },
];

export const Menu = () => {
  const pathname = usePathname();

  console.log("search params", pathname);

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton isActive={pathname === item.url} asChild>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
