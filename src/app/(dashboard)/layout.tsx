"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/navigations/header";
import Sidebar from "@/components/navigations/sidebar";
import type { Navigation } from "@/types/navigation";
import { Home } from "lucide-react";


const navigation: Navigation[] = [
  { name: "Home", href: "/", icon: Home },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  navigation.map((item) => {
    item.current = item.href === pathname;
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar navigation={navigation} />
      <div className="flex flex-col sm:py-3 sm:pl-14">
        <Header pathname={pathname} navigation={navigation} />
        <main className="py-2">{children}</main>
      </div>
    </div>
  );
}
