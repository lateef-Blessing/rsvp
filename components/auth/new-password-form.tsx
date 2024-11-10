"use client"

import * as z from "zod";
import { useState, useTransition } from "react";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { NewPasswordSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newPassword } from "@/actions/new-password";
import { TopDots } from "@/components/root/top-dots";
import { BottomDots } from "@/components/root/bottom-dots";

export const NewPasswordForm = () => {

    const searchParam = useSearchParams();
    const token = searchParam.get("token");

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        });
    };

    return (
        <section className="py-14 lg:py-20 mt-24 bg-zinc-400/10">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-2">
            <div className="relative mx-auto bg-background max-w-[525px] overflow-hidden rounded-lg px-8 py-14 sm:px-12 md:px-[60px]">
              <div className="mb-10 flex items-center justify-center gap-2 text-3xl text-zinc-700 dark:text-white">
                <KeyRound className="h-8 w-8" />
                <h1 className="tracking-tight font-semibold">
                  New password
                </h1>
              </div>
            <Form {...form} >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
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
                                            disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>Reset password</Button>
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
    )
};