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
import {
  activateAdminAccountSchema,
  activateAdminAccountSchemaType,
} from "@/lib/zodSchema";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ActivateAdminForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { activateAdminAccount, isActivatingAccount } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<activateAdminAccountSchemaType>({
    resolver: zodResolver(activateAdminAccountSchema),
    defaultValues: {
      adminId: "",
      activationPin: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: activateAdminAccountSchemaType) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const success = await activateAdminAccount(data);
    if (success) {
      router.push("/login");
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
          <CardTitle className="text-2xl font-semibold">
            Activate Your Account
          </CardTitle>
          <CardDescription>
            Enter your admin details to activate your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup>
              {/* Admin ID */}
              <Field>
                <FieldLabel htmlFor="adminId">Admin ID</FieldLabel>
                <Input
                  id="adminId"
                  type="text"
                  placeholder="Enter your Admin ID"
                  {...register("adminId")}
                />
                {errors.adminId && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.adminId.message}
                  </p>
                )}
              </Field>

              {/* Activation Pin */}
              <Field>
                <FieldLabel htmlFor="activationPin">Activation Pin</FieldLabel>
                <Input
                  id="activationPin"
                  type="text"
                  placeholder="Enter activation pin"
                  {...register("activationPin")}
                />
                {errors.activationPin && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.activationPin.message}
                  </p>
                )}
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isActivatingAccount}
                className="w-full"
              >
                {isActivatingAccount ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin size-4" />
                    Activating...
                  </div>
                ) : (
                  "Activate Account"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
