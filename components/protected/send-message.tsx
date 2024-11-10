"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSchema } from "@/schemas";
import { sendMessage } from "@/actions/event";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface Props {
  eventId: string;
}

export const SendMessage = ({ eventId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof MessageSchema>) => {
    startTransition(() => {
      sendMessage({
        message: values.message!,
        eventId,
        userId: user?.id!,
        path: "/events",
      });
    });
    form.reset();
    toast.success("Message sent to all members.")
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-3">
        <div className="flex items-center gap-x-2">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Send message to members"
                    type="text"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {isPending ? (
            <Button>Sending...</Button>
          ) : (
            <Button type="submit">Send Mail</Button>
          )}
        </div>
      </form>
    </Form>
  );
};
