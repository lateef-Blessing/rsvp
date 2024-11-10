"use client";

import * as z from "zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { LoginSchema } from "@/schemas";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { Social } from "@/components/auth/social";
import { TopDots } from "@/components/root/top-dots";
import { BottomDots } from "@/components/root/bottom-dots";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <section className="py-14 lg:py-20 mt-24 bg-zinc-400/10">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-2">
            <div className="relative mx-auto bg-background max-w-[525px] overflow-hidden rounded-lg px-8 py-14 sm:px-12 md:px-[60px]">
              <div className="mb-10 flex items-center justify-center gap-2 text-3xl text-zinc-700 dark:text-white">
                <Lock className="h-8 w-8" />
                <h1 className="tracking-tight font-semibold">Login</h1>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    {showTwoFactor && (
                      <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-4 items-center">
                            <FormLabel>Two Factor Code</FormLabel>
                            <FormControl>
                              <InputOTP
                                maxLength={6}
                                {...field}
                                disabled={isPending}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {!showTwoFactor && (
                      <>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="johndoe@example.com"
                                  type="email"
                                  {...field}
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="******"
                                  type="password"
                                  {...field}
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal"
                        >
                          <Link href="/auth/reset">Forgot password?</Link>
                        </Button>
                      </>
                    )}
                  </div>
                  <FormError message={error || urlError} />
                  <FormSuccess message={success} />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {showTwoFactor ? "Confirm" : "Login"}
                  </Button>
                </form>
              </Form>

              {!showTwoFactor && (
                <>
                  <span className="z-1 relative my-4 block text-center">
                    <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-gray-500"></span>
                    <span className="relative z-10 inline-block px-3 text-base bg-background">
                      OR
                    </span>
                  </span>

                  <Social />

                  <p className="text-zinc-500 text-center py-4">
                    Don't have an account?
                    <Link
                      href="/auth/register"
                      className="pl-2 text-primary hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </>
              )}

              <div>
                <TopDots />
                <BottomDots />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
