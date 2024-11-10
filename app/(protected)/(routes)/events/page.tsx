import { getAllEvents } from "@/actions/event";
import { CategoryFilter } from "@/components/protected/category-filter";
import { ContentLayout } from "@/components/protected/content-layout";
import { EventSearch } from "@/components/protected/event-search";
import { EventsCollection } from "@/components/protected/events-collection";
import { currentUser } from "@/lib/auth";
import { SearchParamProps } from "@/types";

export default async function EventsPage({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const user = await currentUser();

  const events = await getAllEvents({
    userId: user?.id as string,
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <ContentLayout title="All Events">
      <section id="events" className="my-8 flex flex-col gap-8 md:gap-12">
        <div className="flex w-full flex-col gap-5 md:flex-row items-center">
          <EventSearch />
          <CategoryFilter />
        </div>
        <EventsCollection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </ContentLayout>
  );
}
