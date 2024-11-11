"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import { toast } from "sonner";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventWithUser } from "@/types";
import { createEvent, updateEvent } from "@/actions/event";
import { FileUpload } from "@/components/protected/file-upload";
import { CategoryDropdown } from "@/components/protected/category-dropdown";
import { EventSchema } from "@/schemas";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: EventWithUser;
  eventId?: string;
};

const eventDefaultValues = {
  title: "",
  description: "",
  imageUrl: "",
  eventDate: new Date(),
  categoryId: "",
  location: "",
  price: "",
};

export const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          eventDate: new Date(event.eventDate),
        }
      : eventDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof EventSchema>) {
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values },
          userId,
          path: "/create",
        });

        const response = await fetch(`/api/${newEvent?.id}/paystack`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ userId: userId }),
        });

        if (!response.ok) throw new Error("Failed to initialize payment");

        const { authorization_url } = await response.json();
        // Redirect to Paystack payment page
        window.location.href = authorization_url;
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="md:grid md:grid-cols-2 gap-8">
          <div className="w-full overflow-hidden rounded-full bg-background text-foreground border-2 my-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Event title"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full overflow-hidden rounded-full bg-background text-foreground border-2 my-2">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CategoryDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-full bg-background text-foreground border-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="dollar"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="Event Location"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="md:grid md:grid-cols-2 gap-8">
          <div className="w-full overflow-hidden rounded-lg bg-background text-foreground border-2 my-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea
                      placeholder="Description"
                      {...field}
                      className="textarea rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full rounded-lg bg-background text-foreground border-2 my-2 h-[300px] overflow-y-hidden">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUpload
                      onChange={field.onChange}
                      value={field.value}
                      endpoint="eventImage"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full overflow-hidden rounded-full bg-background text-foreground border-2 my-2">
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center justify-between h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                      <div className="flex items-center w-full h-[400px] gap-2">
                        <Image
                          src="/assets/icons/calendar.svg"
                          alt="calendar"
                          width={24}
                          height={24}
                        />
                        <p className="whitespace-nowrap">Event Date: </p>
                      </div>
                      <DatePicker
                        className="border-none bg-transparent outline-none cursor-pointer"
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full overflow-hidden rounded-full bg-background text-foreground border-2 my-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                      <Image
                        src="/assets/icons/dollar.svg"
                        alt="dollar"
                        width={24}
                        height={24}
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        className="input-field"
                        disabled={type == "Update"}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
        </Button>
      </form>
    </Form>
  );
};
