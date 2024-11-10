import { Footer } from "@/components/root/footer";
import { Navbar } from "@/components/root/navbar";
import { ScrollToTop } from "@/components/root/scroll-to-top";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default RootLayout;
