/* eslint-disable react/jsx-no-undef */
import "~/styles/admin.css";
import { GeistSans } from "geist/font/sans";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "~/admin/components/ui/Sidebar";
import {
  Fish,
  GalleryVerticalEnd,
  Home,
  ShoppingCart,
  Soup,
  Speaker,
  User,
} from "lucide-react";
import { Separator } from "~/admin/components/ui/Separator";
import Link from "next/link";
import { Toaster } from "~/admin/components/ui/Toaster";
import { ThemeProvider } from "~/admin/providers/ThemeProvider";
import { ModeToggle } from "~/admin/components/ui/ModeToggle";
import { NavUser } from "~/admin/components/ui/NavUser";

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

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${GeistSans.className}`}>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <GalleryVerticalEnd className="size-4" />
                    </div>

                    <span className="font-semibold">
                      Audiophile Panel Admin
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="gap-0">
              <SidebarGroup>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <NavUser
                user={{
                  avatar: null,
                  email: "anakin.skywalker@gmail.com",
                  name: "Anakin Sywalker",
                }}
              />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          <SidebarInset>
            <header className="bg-background flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
              <ModeToggle />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
