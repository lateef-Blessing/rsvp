import { ContentLayout } from "@/components/protected/content-layout";
import { EventForm } from "@/components/protected/event-form";
import { currentUser } from "@/lib/auth";

export default async function CreateEvent() {
  const user = await currentUser();

  const userId = user?.id as string;

  return (
    <ContentLayout title="Create an Event">
      <div className="my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </ContentLayout>
  );
}
