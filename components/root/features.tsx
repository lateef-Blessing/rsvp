import { SectionTitle } from '@/components/root/section-title'

type Feature = {
  id: number
  icon: JSX.Element
  title: string
  paragraph: string
}

export function Features() {
  return (
    <section className="py-10 md:py-[80px]" id="features">
      <div className="container">
        <SectionTitle
          subtitle="Features"
          title="Main Features Of ATENDEO"
          paragraph="Customizable event website, Fair compensation for committed participants. Efficient event management tools. Automated fee redistribution. Risk-free for attendees (Refund for cancellations)."
          center
        />

        <div className="max-w-sm mx-auto py-10 md:py-[80px] grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 items-center md:max-w-2xl lg:max-w-none">
          {featuresData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature
  return (
    <div className="group relative flex flex-col items-center px-4 rounded-xl py-[30px] shadow-md sm:px-[30px] bg-zinc-400/10">
      <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center  rounded-2xl bg-primary">
        <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
        {icon}
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-lg text-center">{paragraph}</p>
    </div>
  )
}

const EventCreationIcon = () => (
  <span
    role="img"
    aria-label="Event Creation"
    className="text-[40px] text-center"
  >
    📝
  </span>
)

const AttendeesManagement = () => (
  <span
    role="img"
    aria-label="Invite Attendees"
    className="text-[40px] text-center"
  >
    💼
  </span>
)

const CancellationIcon = () => (
  <span
    role="img"
    aria-label="Cancellation and Refunds"
    className="text-[40px] text-center"
  >
    ❌
  </span>
)

const RemindersIcon = () => (
  <span role="img" aria-label="Reminders" className="text-[40px] text-center">
    ⏰
  </span>
)

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <EventCreationIcon />,
    title: 'Event Creation',
    paragraph:
      'Allow creators to set event details. Set attendee fee amount. Manage Guest list and Secure event invitations.',
  },
  {
    id: 2,
    icon: <AttendeesManagement />,
    title: 'RSVP Management',
    paragraph:
      'Allow attendees to RSVP online. Charge attendee fee upon RSVP confirmation. Display online attendee list and status.',
  },
  {
    id: 3,
    icon: <CancellationIcon />,
    title: 'Cancellation and Refunds',
    paragraph:
      'Allow creators to cancel events. Automatically notify and refund fees to all participants upon cancellation.',
  },
  {
    id: 4,
    icon: <RemindersIcon />,
    title: 'Notifications and Reminders',
    paragraph:
      'Send event reminders(24hrs, 48hrs, 7days) and updates to attendees. Notify attendees about updates or cancellation.',
  },
]
