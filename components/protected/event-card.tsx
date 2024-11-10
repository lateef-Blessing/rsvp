"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit } from "lucide-react";

import { formatDateTime } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { EventWithUserWithCategory } from "@/types";
import { DeleteEventConfirmation } from "@/components/protected/delete-event-confirmation";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

type CardProps = {
  event: EventWithUserWithCategory;
  hasOrderLink?: boolean;
};

export const EventCard = ({ event, hasOrderLink }: CardProps) => {
  const user = useCurrentUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const userId = user?.id as string;

  const isEventCreator = userId === event.userId.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl shadow-md transition-all hover:shadow-lg md:min-h-[438px] bg-background text-foreground border-2">
      <Link
        href={`/events/${event.id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-cover bg-center"
      />
      {/* IS EVENT CREATOR ... */}

      {user.role == UserRole.ADMIN || isEventCreator && new Date(event.eventDate) > new Date() && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl p-2 shadow-sm transition-all bg-white">
          <Link href={`/events/${event.id}/update`}>
            <Edit className="text-primary w-5 h-5" />
          </Link>
          <DeleteEventConfirmation eventId={event.id} />
        </div>
      )}

      <div className="flex min-h-[150px] flex-col gap-2 p-5 md:gap-3">
        <div className="flex gap-2 pl-2">
          <span className="w-min rounded-full px-4 py-1 bg-primary/25 text-primary">
            ${event.price}
          </span>
          <p className="w-min rounded-full px-4 py-1 line-clamp-1 bg-secondary">
            {event.category.name}
          </p>
        </div>

        <p className="text-sm tracking-tight text-muted-foreground">
          {formatDateTime(event.eventDate).dateTime}
        </p>

        <Link href={`/events/${event.id}`}>
          <p className="line-clamp-2 flex-1 font-semibold tracking-tight">
            {event.title}
          </p>
        </Link>

        <div className="flex justify-between items-center w-full">
          <p className="">{event.user.name}</p>

          {hasOrderLink && (
            <Link href={`/members?eventId=${event.id}`} className="flex gap-2">
              <p className="text-primary">Member Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
