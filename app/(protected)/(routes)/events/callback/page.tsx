"use client"

import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("eventId");

  router.push(`/events/${eventId}`);
};
