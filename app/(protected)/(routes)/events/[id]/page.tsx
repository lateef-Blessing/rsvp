import Image from "next/image";
import { Member } from "@prisma/client";
import { redirect } from "next/navigation";

import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { EventsCollection } from "@/components/protected/events-collection";
import { ContentLayout } from "@/components/protected/content-layout";
import { getEventById, getRelatedEventsByCategory } from "@/actions/event";
import { CopyLink } from "@/components/protected/copy-link";
import { currentUser } from "@/lib/auth";
import { CheckoutButton } from "@/components/protected/checkout-button";
import { DeleteAttendanceConfirmation } from "@/components/protected/delete-attendance-confirmation";
import { BackButton } from "@/components/protected/back-button";
import Link from "next/link";

export default async function EventDetails({
  params: { id },
  searchParams,
}: SearchParamProps) {
  const event = await getEventById(id);
  if (!event) {
    return redirect("/events");
  }

  const user = await currentUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const memberIds = event?.members?.map((member: Member) => member?.userId);
  const relatedEvents = await getRelatedEventsByCategory({
    userId: user?.id as string,
    categoryId: event?.category?.id,
    eventId: event?.id,
    page: searchParams.page as string,
  });

  return (
    <ContentLayout title="Event Details">
      <BackButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </BackButton>
      <section className="flex justify-center bg-background text-foreground bg-contain my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event?.imageUrl}
            alt="Event image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-fill cursor-pointer"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl">{event?.title}</h2>

              <p className="font-medium tracking-tight mt-2">
                Organised by{" "}
                <span className="text-muted-foreground">
                  {event?.user?.name} ({event?.user?.email})
                </span>
              </p>

              <p className="font-semibold tracking-tight w-max rounded-full px-5 py-2 bg-primary/25 text-primary">
                Event Category: {event?.category?.name}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="font-medium lg:font-normal flex flex-wrap items-center">
                  <p>{formatDateTime(event?.eventDate).dateTime}</p>
                </div>
              </div>

              <div className="font-normal tracking-tight flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="font-medium tracking-tight lg:font-normal">
                  {event?.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="font-bold text-foreground">Event Description:</p>
                <p className="font-medium lg:font-normal">
                  {event?.description}
                </p>
              </div>
              <div>
                <p className="font-bold text-foreground">Note:</p>
                <p className="font-medium lg:font-normal">
                  Event Fee is set by the organizer and refundable if present at
                  event. Check{" "}
                  <span>
                    <Link href="/terms" className="text-primary">
                      Terms
                    </Link>
                  </span>{" "}
                  for further information!
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-semibold tracking-tight rounded-full px-5 py-2 bg-primary/25 text-primary">
                Event Fee: ${event?.price}
              </p>

              {user?.id !== event?.userId &&
                !memberIds?.includes(user?.id) &&
                event?.stop_attendance == false && (
                  <CheckoutButton event={event} />
                )}
            </div>

            {memberIds?.includes(user?.id) && user?.id !== event?.userId && (
              <DeleteAttendanceConfirmation eventId={event?.id} />
            )}

            <div className="flex flex-col mt-4">
              <p className="font-medium lg:font-bold tracking-tight leading-relaxed m-0 p-0">
                Invite People:
              </p>
              <CopyLink link={event?.id} />
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="font-semibold">Related Events</h2>

        <EventsCollection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </ContentLayout>
  );
}
