"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  SearchIcon,
  CommandIcon,
  User2,
  BoxIcon,
  UserCircle2Icon,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { authUser } = useAuthStore();

  const role = authUser?.role;

  const allNavMain = [
    {
      title: "Register Officer",
      url: "/register-officers",
      icon: <LayoutDashboardIcon />,
      roles: ["ADMIN"],
    },
    {
      title: "Register Voters",
      url: "/register-voters",
      icon: <User2 />,
      roles: ["ADMIN", "OFFICER"],
    },
    {
      title: "Elections",
      url: "/election",
      icon: <BoxIcon />,
      roles: ["ADMIN"],
    },
    {
      title: "Profile",
      url: "/profile",
      icon: <UserCircle2Icon />,
      roles: ["ADMIN", "OFFICER"],
    },
  ];

  const navMain = allNavMain.filter((item) => item.roles.includes(role ?? ""));

  const data = {
    user: {
      name: authUser?.firstName ?? "",
      email: authUser?.email ?? "",
      avatar: authUser?.profilePicture ?? "",
    },
    navMain,
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <CommandIcon className="size-5!" />
                <span className="text-primary font-semibold">Votosi</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} role={authUser?.role} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
