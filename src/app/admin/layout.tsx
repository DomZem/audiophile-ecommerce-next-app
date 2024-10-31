import "~/styles/admin.css";
import { GeistSans } from "geist/font/sans";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={GeistSans.className}>{children}</div>;
}
