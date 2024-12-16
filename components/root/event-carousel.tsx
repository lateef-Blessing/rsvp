'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const events = [
  { type: 'Birthday', icon: '🎉' },
  { type: 'Wedding', icon: '💍' },
  { type: 'Conference', icon: '🎤' },
  { type: 'Concert', icon: '🎶' },
  { type: 'Seminar', icon: '📚' },
  { type: 'Fitness/Wellness', icon: '💪' },
  { type: 'Social', icon: '🥳' },
  { type: 'Business', icon: '💼' },
  { type: 'Networking', icon: '🤝' },
]

export const EventCarousel = () => {
  return (
    <div className="mx-auto mt-10 container text-center">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={2} // Default for mobile
        breakpoints={{
          640: { slidesPerView: 2 }, // Mobile
          1024: { slidesPerView: 5 }, // Desktop
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div className="p-4 text-center">
              <span className="text-4xl">{event.icon}</span>
              <h3 className="my-4 text-lg font-semibold">{event.type}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
