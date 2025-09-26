"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "./SidebarData";

export default function Sidebar() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <aside className="w-52 h-[92vh] bg-background border-r p-4 flex flex-col gap-4 absolute">
      <h2 className="text-2xl font-bold px-2">Menu</h2>
      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="justify-start"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}
