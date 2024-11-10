import { Navbar } from "@/components/protected/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const ContentLayout = ({ title, children }: ContentLayoutProps) => {
  return (
    <div>
      <Navbar title={title} />
      <div className="p-2 sm:p-4">{children}</div>
    </div>
  );
}
