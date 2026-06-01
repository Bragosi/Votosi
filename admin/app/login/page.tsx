import { LoginForm } from "@/components/login-form"
import { ThemeToggle } from "@/components/ui/themeToggle"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            {/* Top Bar */}
      <div className="absolute left-0 top-0 flex w-full items-center justify-between px-4 py-4 md:px-8">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
