import { SectionTitle } from '@/components/root/section-title'

const EventCreationIcon = () => (
  <span
    role="img"
    aria-label="Event Creation"
    className="text-[40px] text-center"
  >
    📝
  </span>
)

const InviteAttendeesIcon = () => (
  <span
    role="img"
    aria-label="Invite Attendees"
    className="text-[40px] text-center"
  >
    📩
  </span>
)

const RemindersIcon = () => (
  <span role="img" aria-label="Reminders" className="text-[40px] text-center">
    ⏰
  </span>
)

const AttendeesConfirmIcon = () => (
  <span
    role="img"
    aria-label="Attendees Confirm"
    className="text-[40px] text-center"
  >
    ✅
  </span>
)

const EventDayIcon = () => (
  <span role="img" aria-label="Event Day" className="text-[40px] text-center">
    📅
  </span>
)

const EveryoneWinsIcon = () => (
  <span
    role="img"
    aria-label="Everyone Wins"
    className="text-[40px] text-center"
  >
    🏆
  </span>
)

export function Workflow() {
  return (
    <section className="py-10 md:py-[60px]" id="workflow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mb-[60px]">
            <SectionTitle
              subtitle="Workflow"
              title="HOW IT WORKS"
              paragraph="ATENDEO is a Streamlined event management tool very easy to use."
              center
            />
          </div>

          {/* Items */}
          <div
            className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-center md:max-w-2xl lg:max-w-none"
            data-aos-id-blocks
          >
            {/* 1st item */}
            <div className="group relative flex flex-col items-center px-4 rounded-xl py-[30px] shadow-md sm:px-[30px] bg-zinc-400/10">
              <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <EventCreationIcon />
              </div>
              <h3 className="font-bold mb-2">Create Your Event</h3>
              <p className="text-lg text-center">
                Set up your event details and RSVP fee, pay fee and generate
                invite links.
              </p>
            </div>

            {/* 2nd item */}
            <div className="group relative flex flex-col items-center px-4 rounded-xl py-[30px] shadow-md sm:px-[30px] bg-zinc-400/10">
              <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <InviteAttendeesIcon />
              </div>
              <h3 className="font-bold mb-2">Invite Attendees</h3>
              <p className="text-lg text-center">
                Share your event link with potential participants to become an
                attendee of the event.
              </p>
            </div>

            {/* 3rd item */}
            <div className="group relative flex flex-col items-center px-4 rounded-xl py-[30px] shadow-md sm:px-[30px] bg-zinc-400/10">
              <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <AttendeesConfirmIcon />
              </div>
              <h3 className="font-bold mb-2">Secure RSVPs</h3>
              <p className="text-lg text-center">
                Attendees confirm their spot by paying the invite fee and get
                added to the event.
              </p>
            </div>

            {/* 4th item */}
            <div className="group relative flex flex-col items-center px-4 rounded-xl py-[30px] shadow-md sm:px-[30px] bg-zinc-400/10">
              <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <RemindersIcon />
              </div>
              <h3 className="font-bold mb-2">Reminder</h3>
              <p className="text-lg text-center">
                Notifications are received 24 hours to the event, notifications
                of canceled events, refunds and redistributed invite fees are
                also received by RSVPs.
              </p>
            </div>

            {/* 5th item */}
            <div className="group relative flex flex-col items-center px-4 rounded-xl py-[30px] shadow-md sm:px-[30px] bg-zinc-400/10">
              <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <EventDayIcon />
              </div>
              <h3 className="font-bold mb-2">Event Day</h3>
              <p className="text-lg text-center">
                Attendees Scan QR codes to confirm attendance, and fees from
                no-shows are automatically redistributed to attendees after the
                event concludes.
              </p>
            </div>

            {/* 6th item */}
            <div className="group relative flex flex-col items-center px-4 rounded-xl py-[30px] shadow-md sm:px-[30px] bg-zinc-400/10">
              <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <EveryoneWinsIcon />
              </div>
              <h3 className="font-bold mb-2">Everyone Wins</h3>
              <p className="text-lg text-center">
                Committed attendees may receive more than they paid! Increased
                attendance rates. Fair compensation for committed participants
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
