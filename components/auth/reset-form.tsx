"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { CircleHelp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";
import { TopDots } from "@/components/root/top-dots";
import { BottomDots } from "@/components/root/bottom-dots";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
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
                <CircleHelp className="h-8 w-8" />
                <h1 className="tracking-tight font-semibold">
                  Reset password
                </h1>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
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
                  </div>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Send reset email
                  </Button>
                </form>
              </Form>

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
