"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { SectionTitle } from "@/components/root/section-title";

const events = [
  { type: "Birthday", icon: "🎉" },
  { type: "Wedding", icon: "💍" },
  { type: "Conference", icon: "🎤" },
  { type: "Concert", icon: "🎶" },
  { type: "Seminar", icon: "📚" },
  { type: "Fitness/Wellness", icon: "💪" },
  { type: "Social", icon: "🥳" },
  { type: "Business", icon: "💼" },
  { type: "Networking", icon: "🤝" },
];

export const EventCarousel = () => {
  return (
    <div className="py-20 md:py-[120px] bg-zinc-400/10 overflow-x-hidden">
      <SectionTitle
        subtitle="Events"
        title="Event Types"
        paragraph="Here are the types of events you can manage efficiently with our platform."
        center
      />
      <div className="-mx-4 mt-10 container">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="p-4 text-center">
                <span className="text-4xl">{event.icon}</span>
                <h3 className="mt-2 mb-8 text-lg font-semibold">{event.type}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
