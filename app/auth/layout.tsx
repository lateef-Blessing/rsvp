import { Footer } from "@/components/root/footer";
import { Navbar } from "@/components/root/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AuthLayout;
