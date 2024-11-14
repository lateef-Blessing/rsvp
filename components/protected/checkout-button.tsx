"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { EventWithUser } from "@/types";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export const CheckoutButton = ({ event }: { event: EventWithUser }) => {
  const user = useCurrentUser();
  const userId = user?.id as string;
  const [isPending, startTransition] = useTransition();
  const hasEventFinished = new Date(event?.eventDate) < new Date();

  const checkout = async () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/${event?.id}/paystack`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ userId: userId }),
        });

        if (!response.ok) throw new Error("Failed to initialize payment");
        // <Checkout eventId={event?.id} userId={userId} />

        const { authorization_url } = await response.json();
        // Redirect to Paystack payment page
        window.location.href = authorization_url;
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      }
    });
  };

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">Sorry, this event is closed.</p>
      ) : (
        <Button
          onClick={() => checkout()}
          role="link"
          size="lg"
          className="sm:w-fit"
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </Button>
      )}
    </div>
  );
};
