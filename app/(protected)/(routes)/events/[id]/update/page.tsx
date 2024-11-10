import { getEventById } from "@/actions/event";
import { ContentLayout } from "@/components/protected/content-layout";
import { EventForm } from "@/components/protected/event-form";
import { currentUser } from "@/lib/auth";

interface Props {
  params: {
    id: string;
  };
}

const UpdateEvent = async ({ params: { id } }: Props) => {
  const user = await currentUser();

  const userId = user?.id as string;
  const event = await getEventById(id);

  return (
    <ContentLayout title="Update Event">
      <div className="my-8">
        <EventForm
          type="Update"
          event={event}
          eventId={event.id}
          userId={userId}
        />
      </div>
    </ContentLayout>
  );
};

export default UpdateEvent;
