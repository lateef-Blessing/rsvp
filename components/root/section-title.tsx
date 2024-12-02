import { cn } from "@/lib/utils";

export const SectionTitle = ({
  subtitle,
  title,
  paragraph,
  width = "635px",
  center,
}: {
  subtitle?: string;
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
}) => {
  return (
    <div className="-mx-4 flex flex-wrap">
      <div
        className={cn("w-full px-4", center && "mx-auto text-center")}
        style={{ maxWidth: width }}
      >
        {subtitle && (
          <span className="mb-2 text-lg block font-semibold text-primary px-2 py-1 bg-zinc-400/10 w-max rounded-md mx-auto">
            {subtitle}
          </span>
        )}
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-[40px] md:leading-[1.2]">
          {title}
        </h2>
        <p className="text-base leading-relaxed sm:leading-relaxed">
          {paragraph}
        </p>
      </div>
    </div>
  );
};
