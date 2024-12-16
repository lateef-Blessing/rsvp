'use client'

import { useState } from 'react'

import { TopDots } from '@/components/root/top-dots'
import { BottomDots } from '@/components/root/bottom-dots'
import { SectionTitle } from '@/components/root/section-title'

export function Faqs() {
  // State for toggling accordion sections
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <section
      className="relative z-20 overflow-hidden pb-8 pt-20 lg:pb-[50px] lg:pt-[120px] bg-zinc-400/10"
      id="faqs"
    >
      <div className="container">
        <SectionTitle
          subtitle="FAQs"
          title="Any Questions? Answered"
          paragraph=""
          width="640px"
          center
        />

        <div className="max-w-3xl px-4 sm:px-6 lg:px-8 mt-10 mx-auto">
          <div className="accordion-group">
            {/* Accordion Item */}
            <div
              className={`accordion p-4 shadow-md bg-zinc-400/10 rounded-xl transition duration-500 mb-4 lg:p-4`}
            >
              <button
                onClick={() => toggleSection(1)}
                className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-primary ${
                  openSection === 1 ? 'font-medium text-primary' : ''
                }`}
                aria-controls="basic-collapse-one"
              >
                <h5>How does the fee redistribution work?</h5>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 1 ? 'hidden' : 'block'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 1 ? 'block' : 'hidden'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              {openSection === 1 && (
                <div className="accordion-content w-full overflow-hidden pr-4 max-h-[250px]">
                  <p className="text-base font-normal leading-6">
                    If an attendee doesn't show up, 80% of their fee is
                    redistributed among the attending participants. The
                    remaining 20% covers our platform costs.
                  </p>
                </div>
              )}
            </div>
            {/* Accordion Item */}
            {/* Accordion Item */}
            <div
              className={`accordion p-4 shadow-md bg-zinc-400/10 rounded-xl transition duration-500 mb-4 lg:p-4`}
            >
              <button
                onClick={() => toggleSection(2)}
                className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-primary ${
                  openSection === 2 ? 'font-medium text-primary' : ''
                }`}
                aria-controls="basic-collapse-one"
              >
                <h5>Can I create any type of Event?</h5>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 2 ? 'hidden' : 'block'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 2 ? 'block' : 'hidden'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              {openSection === 2 && (
                <div className="accordion-content w-full overflow-hidden pr-4 max-h-[250px]">
                  <p className="text-base font-normal leading-6">
                    Yes, there is no restriction on event types, all events
                    ranging from Corporate events like Conferences, to Social
                    events like Birthdays, as well as Weddings and Educational
                    Seminars
                  </p>
                </div>
              )}
            </div>
            {/* Accordion Item */}
            {/* Accordion Item */}
            <div
              className={`accordion p-4 shadow-md bg-zinc-400/10 rounded-xl transition duration-500 mb-4 lg:p-4`}
            >
              <button
                onClick={() => toggleSection(3)}
                className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-primary ${
                  openSection === 3 ? 'font-medium text-primary' : ''
                }`}
                aria-controls="basic-collapse-one"
              >
                <h5>What if I need to cancel my attendance?</h5>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 3 ? 'hidden' : 'block'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 3 ? 'block' : 'hidden'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              {openSection === 3 && (
                <div className="accordion-content w-full overflow-hidden pr-4 max-h-[250px]">
                  <p className="text-base font-normal leading-6">
                    No worries! You cancel your attendance you receiver half of
                    your deposit, the other half goes to the event attendees.
                  </p>
                </div>
              )}
            </div>
            {/* Accordion Item */}
            {/* Accordion Item */}
            <div
              className={`accordion p-4 shadow-md bg-zinc-400/10 rounded-xl transition duration-500 mb-4 lg:p-4`}
            >
              <button
                onClick={() => toggleSection(4)}
                className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-primary ${
                  openSection === 4 ? 'font-medium text-primary' : ''
                }`}
                aria-controls="basic-collapse-one"
              >
                <h5>Can I cancel an event?</h5>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 4 ? 'hidden' : 'block'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 4 ? 'block' : 'hidden'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              {openSection === 4 && (
                <div className="accordion-content w-full overflow-hidden pr-4 max-h-[250px]">
                  <p className="text-base font-normal leading-6">
                    Yes, you can cancel any event you created, and notifications
                    will be sent to all that RSVPd.
                  </p>
                </div>
              )}
            </div>
            {/* Accordion Item */}
            {/* Accordion Item */}
            <div
              className={`accordion p-4 shadow-md bg-zinc-400/10 rounded-xl transition duration-500 mb-4 lg:p-4`}
            >
              <button
                onClick={() => toggleSection(5)}
                className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-primary ${
                  openSection === 5 ? 'font-medium text-primary' : ''
                }`}
                aria-controls="basic-collapse-one"
              >
                <h5>Is my money safe?</h5>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 5 ? 'hidden' : 'block'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 5 ? 'block' : 'hidden'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              {openSection === 5 && (
                <div className="accordion-content w-full overflow-hidden pr-4 max-h-[250px]">
                  <p className="text-base font-normal leading-6">
                    Absolutely. All fees are held securely by the system, acting
                    as an escrow. Payments are only processed after the event
                    concludes.
                  </p>
                </div>
              )}
            </div>
            {/* Accordion Item */}
            {/* Accordion Item */}
            <div
              className={`accordion p-4 shadow-md bg-zinc-400/10 rounded-xl transition duration-500 mb-4 lg:p-4`}
            >
              <button
                onClick={() => toggleSection(6)}
                className={`accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 w-full transition duration-500 hover:text-primary ${
                  openSection === 6 ? 'font-medium text-primary' : ''
                }`}
                aria-controls="basic-collapse-one"
              >
                <h5>When is the money distributed?</h5>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 6 ? 'hidden' : 'block'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 transition duration-500 ${
                    openSection === 6 ? 'block' : 'hidden'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              {openSection === 6 && (
                <div className="accordion-content w-full overflow-hidden pr-4 max-h-[250px]">
                  <p className="text-base font-normal leading-6">
                    All deposits and bonuses are distributed at the night of the
                    event.
                  </p>
                </div>
              )}
            </div>
            {/* Accordion Item */}
          </div>
        </div>
      </div>
      <div>
        <TopDots />
        <BottomDots />
      </div>
    </section>
  )
}
