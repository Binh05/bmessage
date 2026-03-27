"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Tên người dùng tối thiểu 3 ký tự")
    .max(20, "Tên người dùng tối đa 20 ký tự"),
  email: z.email("Email không hợp lệ"),
  password: z
    .string()
    .min(3, "Mật khẩu tối thiểu 3 ký tự")
    .max(20, "Mật khẩu tối đa 10 ký tự"),
});

type SignupTypeValues = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupTypeValues>({ resolver: zodResolver(signupSchema) });
  const { SignUp } = useAuth();

  const onSignup = (data: SignupTypeValues) => {
    SignUp(data.username, data.email, data.password);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-border overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSignup)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome to join with us</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up to create your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="username">User name</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your name"
                  {...register("username")}
                />
                {errors.username && (
                  <FieldDescription className="text-destructive text-sm">
                    {errors.username.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <FieldDescription className="text-destructive text-sm">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <FieldDescription className="text-destructive text-sm">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  Sign up
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Have an account? <Link href="/login">Login</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/undraw_welcome.svg"
              alt="Image"
              className="absolute top-1/2 left-1/2 h-3/4 w-3/4 -translate-1/2 object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
