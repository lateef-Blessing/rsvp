import Image from "next/image";
import { MemberWithUser } from "@/types";

import { getEventById } from "@/actions/event";
import { ContentLayout } from "@/components/protected/content-layout";
import { EventSearch } from "@/components/protected/event-search";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { getMembersByEventId } from "@/actions/member";
import { MemberRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { EventQRCode } from "@/components/protected/event-qr-code";
import { StopAttendanceConfirmation } from "@/components/protected/stop-attendance-confirmation";
import { EnableAttendanceConfirmation } from "@/components/protected/enable-attendance-confirmation";
import { SendMessage } from "@/components/protected/send-message";

export default async function MembersPage({ searchParams }: SearchParamProps) {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";
  const event = await getEventById(eventId);
  const members = await getMembersByEventId({
    eventId,
    searchString: searchText,
  });

  return (
    <ContentLayout title="Member Details">
      <section className="flex justify-center bg-background text-foreground bg-contain my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <EventQRCode
            link={`${process.env.NEXT_PUBLIC_APP_URL}/events/${event?.id}/code/${event?.inviteCode}`}
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="font-semibold tracking-tight rounded-full px-5 py-2 bg-primary/25 text-primary">
                    ${event.price}
                  </p>
                  <p className="font-medium tracking-tight rounded-full bg-secondary px-4 py-2.5 text-muted-foreground">
                    {event.category.name}
                  </p>
                </div>

                <p className="font-medium tracking-tight ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-muted-foreground">
                    {event.user.name} ({event?.user?.email})
                  </span>
                </p>
              </div>
            </div>

            {event?.stop_attendance == false && (
              <StopAttendanceConfirmation eventId={event?.id} />
            )}
            {event?.stop_attendance == true && (
              <EnableAttendanceConfirmation eventId={event?.id} />
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
                    {formatDateTime(event.eventDate).dateOnly} -{" "}
                    {formatDateTime(event.eventDate).timeOnly}
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
                  {event.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-foreground">Details:</p>
              <p className="font-medium lg:font-normal">{event.description}</p>
            </div>

          <SendMessage eventId={event?.id} />
          
          </div>
        </div>
      </section>

      <section className="mt-8">
        <EventSearch placeholder="Search member name..." />
      </section>

      <section className="overflow-x-auto p-1">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="font-medium tracking-tight border-b text-muted-foreground">
              <th className="min-w-[250px] py-3 text-left">Member ID</th>
              <th className="min-w-[150px] py-3 text-left">Name</th>
              <th className="min-w-[150px] py-3 text-left">Role</th>
              <th className="min-w-[100px] py-3 text-left">Date Joined</th>
              <th className="min-w-[100px] py-3 text-right">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {members && members.length === 0 ? (
              <tr className="border-b">
                <td
                  colSpan={5}
                  className="py-4 text-center text-muted-foreground"
                >
                  No members found.
                </td>
              </tr>
            ) : (
              <>
                {members &&
                  members.map((row: MemberWithUser) => (
                    <tr
                      key={row.id}
                      className="font-normal tracking-tight leading-relaxed lg:font-medium border-b"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-primary">
                        {row.id}
                      </td>
                      <td className="min-w-[150px] py-4">{row.user.name}</td>
                      <td className="min-w-[150px] py-4">
                        {row.role == MemberRole.ADMIN ? "Organizer" : "Guest"}
                      </td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.createdAt).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4 text-right">
                        {new Date(event.eventDate) > new Date() && (
                          <Button className="bg-primary">
                            {row.attended ? "Present" : "Pending"}
                          </Button>
                        )}
                        {new Date(event.eventDate) < new Date() && (
                          <Button className="bg-primary">
                            {row.attended ? "Present" : "Flaked"}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </ContentLayout>
  );
}
