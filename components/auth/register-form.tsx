"use client";

import * as z from "zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";
import { Social } from "@/components/auth/social";
import { TopDots } from "@/components/root/top-dots";
import { BottomDots } from "@/components/root/bottom-dots";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
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
                <h1 className="tracking-tight font-semibold">Register</h1>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
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
                  </div>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Create an account
                  </Button>
                </form>
              </Form>

              <span className="z-1 relative my-4 block text-center">
                <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-gray-500"></span>
                <span className="relative z-10 inline-block px-3 text-base bg-background">
                  OR
                </span>
              </span>

              <Social />

              <p className="text-zinc-500 text-center py-4">
                Already have an account?
                <Link
                  href="/auth/login"
                  className="pl-2 text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>

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
