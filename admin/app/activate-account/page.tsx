import { buttonVariants } from "@/components/ui/button";
import { ActivateAdminForm } from "./_components/ActivateAdminForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/themeToggle";

export default function ActivateAdminAccount() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background px-4 py-10">
      {/* Top Bar */}
      <div className="absolute left-0 top-0 flex w-full items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/login"
          className={buttonVariants({
            variant: "outline",
            className: "gap-2 shadow-sm transition-all hover:scale-[1.02]",
          })}
        >
          <ArrowLeft className="size-4" />
          Back to Login
        </Link>

        <ThemeToggle />
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-md">
          <ActivateAdminForm />
      </div>
    </div>
  );
}
