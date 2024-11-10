import { getEventsByUser } from "@/actions/event";
import { ContentLayout } from "@/components/protected/content-layout";
import { EventsCollection } from "@/components/protected/events-collection";
import { currentUser } from "@/lib/auth";
import { SearchParamProps } from "@/types";

export default async function EventsOrganizedPage({
  searchParams,
}: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const user = await currentUser();

  const events = await getEventsByUser({
    userId: user?.id as string,
    limit: 6,
    page,
  });

  return (
    <ContentLayout title="Events Organized">
      <section id="events" className="my-8 flex flex-col gap-8 md:gap-12">
        <EventsCollection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Create one now"
          collectionType="Events_Organized"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </ContentLayout>
  );
}
