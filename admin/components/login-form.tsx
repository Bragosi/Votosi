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
        "flex items-center justify-center min-h-screen px-4",
        className,
      )}
      {...props}
    >
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>
            Login to access your admin dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email or Admin Id</FieldLabel>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter email or admin ID"
                  {...register("identifier")}
                />

                {errors.identifier && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.identifier.message}
                  </p>
                )}
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              {/* Submit */}
              <Button type="submit" disabled={isLoggingIn} className="w-full">
                {isLoggingIn ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin size-4" />
                    Signing in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </FieldGroup>

            {/* Activation link */}
            <div className="text-center text-sm text-muted-foreground">
              Don’t have an activated account?{" "}
              <Link
                href="/activate-account"
                className="text-primary font-medium hover:underline"
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
