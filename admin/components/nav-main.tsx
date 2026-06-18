"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";

export function NavMain({
  items,
  role,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
  role?: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {role === "ADMIN" && (
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90">
                <Link
                  href="/election/create-election"
                  className="flex items-center gap-2"
                >
                  <CirclePlusIcon />
                  <span>Start an Election</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url}>
                <SidebarMenuButton>
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
