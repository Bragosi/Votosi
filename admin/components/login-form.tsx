"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema, adminLoginSchemaType } from "@/lib/zodSchema";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/ondo state logo.png";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { adminLogin, isLoggingIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<adminLoginSchemaType>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: adminLoginSchemaType) => {
    const success = await adminLogin(data);

    if (success) {
      router.push("/");
    }
  };

  return (
    <div
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-background via-background to-muted/30 px-4 py-10",
        className
      )}
      {...props}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Card className="w-full max-w-md border shadow-xl backdrop-blur-sm">
        <CardHeader className="space-y-6 pb-2">
          <div className="flex flex-col items-center">
              <Image
                src={Logo}
                alt="Votosi Logo"
                width={80}
                height={80}
                className="object-contain animate-bounce"
                priority
              />

            <CardTitle className="text-center text-3xl font-bold tracking-tight">
              Welcome Back
            </CardTitle>

            <CardDescription className="mt-2 text-center text-sm">
              Sign in to access the Votosi Admin Dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="identifier">
                  Email or Admin ID
                </FieldLabel>

                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your email or admin ID"
                  autoComplete="username"
                  {...register("identifier")}
                />

                {errors.identifier && (
                  <p className="mt-2 text-sm text-destructive">
                    {errors.identifier.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                />

                {errors.password && (
                  <p className="mt-2 text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Button
                type="submit"
                disabled={isLoggingIn}
                className="h-11 w-full text-base font-medium"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </FieldGroup>

            <div className="border-t pt-4 text-center text-sm text-muted-foreground">
              Don't have an activated account?{" "}
              <Link
                href="/activate-account"
                className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
              >
                Activate account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}