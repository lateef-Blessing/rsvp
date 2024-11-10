import Image from "next/image";

import { SectionTitle } from "@/components/root/section-title";

type Testimonial = {
  id: number;
  name: string;
  designation: string;
  content: string;
  image: string;
  star: number;
};

export function Testimonials() {
  return (
    <section className="py-20 md:py-[120px]" id="testimonials">
      <div className="container px-4">
        <SectionTitle
          subtitle="Testimonials"
          title="What our Client Say"
          paragraph=""
          width="640px"
          center
        />

        <div className="mt-[60px] flex flex-wrap lg:mt-20 gap-y-8">
          {testimonialData.map((testimonial, i) => (
            <SingleTestimonial key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  let ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span key={index} className="text-[#fbb040]">
        {starIcon}
      </span>
    );
  }

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className="rounded-xl px-4 py-[30px] shadow-md sm:px-[30px] bg-zinc-400/10"
        data-wow-delay=".1s"
      >
        <div className="mb-[18px] flex items-center gap-[2px]">
          {ratingIcons}
        </div>

        <p className="mb-6 text-base">“{content}</p>

        <div className="flex items-center gap-4">
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
            <Image src={image} alt={name} width={50} height={50} />
          </div>

          <div>
            <h3 className="text-sm font-semibold">{name}</h3>
            <p className="text-xs">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah T., Event Coordinator",
    designation: "Founder @ Rolex",
    content:
      "Atendeo has transformed how I manage my corporate events. No-shows have decreased significantly, and my attendees love the potential for bonus payouts!",
    image: "/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Oluchi L., Wedding Planner",
    designation: "Founder @ UI Hunter",
    content:
      "I used to waste so much time and money on flaky RSVPs. This platform has made my life as a wedding planner so much easier! Everything is automated.",
    image: "/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "William Smith, Event Coordinator",
    designation: "Founder @ Trorex",
    content:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're organizing an event use atendeo, it is very easy to use with full fledged features.",
    image: "/author-03.png",
    star: 5,
  },
];
