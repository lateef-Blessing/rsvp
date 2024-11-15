import { SectionTitle } from "@/components/root/section-title";
import { BellRing, BookX, Calendar, Plus, Users } from "lucide-react";

type Feature = {
  id: number;
  icon: JSX.Element;
  title: string;
  paragraph: string;
};

export function Features() {
  return (
    <section className="py-20 md:py-[120px]" id="features">
      <div className="container">
        <SectionTitle
          subtitle="Features"
          title="Main Features Of ATENDEO"
          paragraph="Increased attendance rates.
Fair compensation for committed participants.
Streamlined event management tools.
Automated fee redistribution.
Risk-free for attendees (full refund for cancellations)"
          center
        />

        <div className="-mx-4 mt-12 flex flex-wrap lg:mt-20">
          {featuresData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div
      className="w-full px-4 md:w-1/2 lg:w-1/4 rounded-xl py-[30px] shadow-md sm:px-[30px] bg-zinc-400/10 m-2"
      data-wow-delay=".1s"
    >
      <div className="group mb-12">
        <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
          <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <p className="mb-8 lg:mb-11">{paragraph}</p>
      </div>
    </div>
  );
};

const EventCreationIcon = () => (
  <span
    role="img"
    aria-label="Event Creation"
    className="text-[40px] text-center"
  >
    📝
  </span>
);

const AttendeesManagement = () => (
  <span
    role="img"
    aria-label="Invite Attendees"
    className="text-[40px] text-center"
  >
    💼
  </span>
);

const CancellationIcon = () => (
  <span
    role="img"
    aria-label="Cancellation and Refunds"
    className="text-[40px] text-center"
  >
    ❌
  </span>
);

const RemindersIcon = () => (
  <span role="img" aria-label="Reminders" className="text-[40px] text-center">
    ⏰
  </span>
);

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <EventCreationIcon />,
    title: "Event Creation",
    paragraph:
      "Allow creators to set event details (date, time, location, description). Set attendee fee amount. Generate unique event link for invitations",
  },
  {
    id: 2,
    icon: <AttendeesManagement />,
    title: "Attendee Management",
    paragraph:
      "Allow attendees to RSVP via link. Charge attendee fee upon RSVP confirmation. Display attendee list and status (confirmed, pending, flaked)",
  },
  {
    id: 3,
    icon: <CancellationIcon />,
    title: "Cancellation and Refunds",
    paragraph:
      "Allow creators to cancel events. Automatically refund fees to all participants upon cancellation",
  },
  {
    id: 4,
    icon: <RemindersIcon />,
    title: "Notifications and Reminders",
    paragraph:
      "Send event reminders and updates to attendees. Notify attendees of flaking or cancellation",
  },
];
