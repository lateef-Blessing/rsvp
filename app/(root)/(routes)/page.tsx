import { About } from "@/components/root/about";
import { CallToAction } from "@/components/root/call-to-action";
import { EventCarousel } from "@/components/root/event-carousel";
import { Faqs } from "@/components/root/faqs";
import { Features } from "@/components/root/features";
import { Hero } from "@/components/root/hero";
import { Testimonials } from "@/components/root/testimonials";
import { Workflow } from "@/components/root/workflow";

const Home = () => {
  return (
    <>
      <Hero />
      <EventCarousel />
      <Features />
      <About />
      <Workflow />
      <Testimonials />
      <Faqs />
      <CallToAction />
    </>
  );
};

export default Home;
