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
import { getMemberById } from "@/actions/member";
import { DeleteAttendanceConfirmation } from "@/components/protected/delete-attendance-confirmation";

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

  const member = await getMemberById({ memberId: user?.id as string });

  return (
    <ContentLayout title="Event Details">
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

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="font-semibold tracking-tight rounded-full px-5 py-2 bg-primary/25 text-primary">
                    Event Fee: ${event?.price}
                  </p>
                  <p className="font-medium tracking-tight rounded-full bg-secondary px-4 py-2.5 text-muted-foreground">
                    {event?.category.name}
                  </p>
                </div>

                <p className="font-medium tracking-tight ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-muted-foreground">
                    {event?.user?.name} ({event?.user?.email})
                  </span>
                </p>
              </div>
            </div>

            {memberIds?.includes(user?.id) && user?.id !== event?.userId && (
              <DeleteAttendanceConfirmation eventId={event?.id} />
            )}

            {user?.id !== event?.userId &&
              !memberIds?.includes(user?.id) &&
              event?.stop_attendance == false && (
                <>
                  <CheckoutButton event={event} />
                </>
              )}

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="font-medium lg:font-normal flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event?.eventDate).dateOnly} -{" "}
                    {formatDateTime(event?.eventDate).timeOnly}
                  </p>
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

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-foreground">Details:</p>
              <p className="font-medium lg:font-normal">{event?.description}</p>
              <div className="flex flex-col mt-4">
                <p className="font-medium lg:font-bold tracking-tight leading-relaxed m-0 p-0">
                  Invite People:
                </p>
                <CopyLink link={event?.id} />
              </div>
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
