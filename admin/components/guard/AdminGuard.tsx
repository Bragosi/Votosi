"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import NotAdminRoute from "@/app/not-admin/page";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { authUser, isCheckingAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && (!authUser || authUser.role !== "ADMIN")) {
      router.replace("/not-admin");
    }
  }, [authUser, isCheckingAuth, router]);

  if (isCheckingAuth) return null;

  if (!authUser || authUser.role !== "ADMIN") {
    return <NotAdminRoute />;
  }

  return <>{children}</>;
}