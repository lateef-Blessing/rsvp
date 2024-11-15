import Image from "next/image";

export function About() {
  return (
    <section
      id="about"
      className="pb-8 pt-20 bg-zinc-400/10 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div>
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2 className="mb-5 text-3xl font-bold leading-tight sm:text-[40px] sm:leading-[1.2]">
                  Short Description About Us:
                </h2>
                <p className="mb-10 text-base leading-relaxed">
                  At ATENDEO we're revolutionizing event management. We
                  understand the frustration of no-shows and the impact they
                  have on events of all sizes. Our platform empowers event
                  creators with a unique solution:
                  <br />
                  <br />a fair, automated system that encourages attendance and
                  rewards committed participants at all times.
                </p>

                <a
                  href="/#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-base font-medium duration-300 hover:bg-primary/90"
                >
                  Know more about us
                </a>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                <Image
                  src="/assets/images/undraw_team_goals.svg"
                  alt="hero"
                  width={1000}
                  height={1000}
                  className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
