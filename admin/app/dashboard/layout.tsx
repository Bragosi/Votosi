"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "../store/useAuthStore";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";

export default function DashboardClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
    const { authUser, isCheckingAuth, checkAuth } = useAuthStore();


  // 1. Trigger the cookie check immediately when an authenticated page mounts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 2. Handle redirection once the backend responds
  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      router.push("/login");
    }
  }, [authUser, isCheckingAuth, router]);

  // 3. Show a clean loading screen while verifying the session cookie
  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="text-primary animate-spin size-12" />
      </div>
    );
  }
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}