import { getEventById } from "@/actions/event";
import { BackButton } from "@/components/protected/back-button";
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
